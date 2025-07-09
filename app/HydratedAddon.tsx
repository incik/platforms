"use client";
import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

type HydratedAddonProps = {
  tenantId: string;
  props?: Record<string, any>;
};

export function HydratedAddon({ tenantId, props }: HydratedAddonProps) {
  if (typeof window !== "undefined" && !window.React && !window.ReactDOM) {
    window.React = React;
    window.ReactDOM = ReactDOM;
  }
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const url = `/addons-built/${tenantId}.client.js?ts=${Date.now()}`;

    import(/* webpackIgnore: true */ url)
      .then((mod) => {
        setComponent(() => mod.default || mod.Component);
      })
      .catch((err) => {
        console.error(`Failed to load client addon for ${tenantId}:`, err);
      });
  }, [tenantId]);

  if (!Component) return null;

  console.log(`Rendering addon component for ${tenantId}`, Component);

  return Component ? React.createElement(Component, props) : null;
}

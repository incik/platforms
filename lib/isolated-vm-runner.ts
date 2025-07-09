// ------------------------------
// scripts/ivm-runner.js
// ------------------------------
const ivm = require("isolated-vm");
const fs = require("fs");
const path = require("path");
// const isolates = new Map(); // cache per-tenant isolates

type VNode = {
  type: string | Function;
  props: Record<string, any>;
  children?: VNode[] | VNode | string | number | null | undefined;
};

function renderVNode(
  vnode: VNode | string | number | null | undefined
): React.ReactNode {
  if (typeof vnode === "string") return vnode;
  if (typeof vnode === "number") return vnode.toString();
  if (vnode === null || vnode === undefined) return null;

  const React = require("react");

  return React.createElement(
    vnode.type,
    { ...vnode.props, key: Math.random().toString() },
    Array.isArray(vnode.props?.children)
      ? vnode.props.children.map(renderVNode)
      : renderVNode(vnode.props?.children)
  );
}

async function getOrCreateIsolate(tenantId: string) {
  // if (isolates.has(tenantId)) return isolates.get(tenantId); <-- This acts like a cache, but we don't want that now

  const isolate = new ivm.Isolate({ memoryLimit: 128 });
  const context = await isolate.createContext();
  const jail = context.global;

  await jail.set("global", jail.derefInto());
  await jail.set("log", (...args: any) =>
    console.log(`[${tenantId}]`, ...args)
  );
  await jail.set("error", (...args: any) =>
    console.error(`[${tenantId}]`, ...args)
  );

  await jail.set(
    "__fetch",
    new ivm.Reference(async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    })
  );

  const codePath = path.resolve(
    "public",
    "addons-built",
    `${tenantId}.server.js`
  );

  if (!fs.existsSync(codePath)) {
    console.log(`No server addon code found for tenant: ${tenantId}`);
    return { render: () => null, isolate, context };
  }

  const code = fs.readFileSync(codePath, "utf8");

  const script = await isolate.compileScript(code);
  await script.run(context);

  const renderRef = await context.global.get("render", { reference: true });

  const runner = async (props: any) => {
    const result = await renderRef.apply(undefined, [JSON.stringify(props)], {
      result: { promise: true, externalCopy: true },
    });
    return renderVNode(result.copy());
  };

  const runnerWrapper = { isolate, context, render: runner };
  // isolates.set(tenantId, runnerWrapper);
  return runnerWrapper;
}

module.exports = { getOrCreateIsolate };

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubdomainData } from "@/lib/subdomains";
import { protocol, rootDomain } from "@/lib/utils";
import { HydratedAddon } from "@/app/HydratedAddon";
import { getOrCreateIsolate } from "@/lib/isolated-vm-runner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`,
  };
}

export default async function SubdomainPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const emoji = JSON.parse(subdomainData).emoji;

  const { render } = await getOrCreateIsolate(subdomain);
  const code = await render({ foo: "bar" });

  // console.log("Addon code:", code);
  //const curried = eval(code);
  // if (typeof curried !== "function") {
  //   throw new Error("Addon did not return a valid function");
  // }
  // console.log("Curried code:", curried);
  // const html = await curried(React, fetch);
  // console.log("HTML output:", html);
  // const html = React.createElement("div", {
  //   dangerouslySetInnerHTML: { __html: code },
  // });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="absolute top-4 right-4">
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {rootDomain}
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl mb-6">{emoji}</div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to {subdomain}.{rootDomain}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            This is your custom subdomain page
          </p>
          {code}
          <HydratedAddon tenantId={subdomain} props={{}} />
        </div>
      </div>
    </div>
  );
}

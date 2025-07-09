// ------------------------------
// scripts/ivm-runner.js
// ------------------------------
const ivm = require("isolated-vm");
const fs = require("fs");
const path = require("path");
const isolates = new Map(); // cache per-tenant isolates
// ts-ignore-next-line

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
  //console.log("Rendering vnode:", vnode);

  const React = require("react");

  return React.createElement(
    typeof vnode.type === "function"
      ? (vnode.type as React.ComponentType)
      : vnode.type,
    { ...vnode.props, key: Math.random().toString() },
    Array.isArray(vnode.props?.children)
      ? vnode.props.children.map(renderVNode)
      : renderVNode(vnode.props?.children)
  );
}

async function getOrCreateIsolate(tenantId: string) {
  // if (isolates.has(tenantId)) return isolates.get(tenantId);

  const isolate = new ivm.Isolate({ memoryLimit: 128 });
  const context = await isolate.createContext();
  const jail = context.global;

  await jail.set("global", jail.derefInto());
  await jail.set("log", (...args: any) =>
    console.log(`[${tenantId}]`, ...args)
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

  // context.evalSync(`log('Loading addon for tenant:', '${tenantId}');`, {
  //   reference: true,
  // });

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
  isolates.set(tenantId, runnerWrapper);
  return runnerWrapper;

  // console.log('Creating new isolate for tenant:', tenantId);
  // const isolate = new ivm.Isolate({ memoryLimit: 128 });
  // console.log('Isolate created:', isolate);
  // const context = await isolate.createContext();

  // // set up console/logging
  // await context.global.set('log', (...args) => console.log('[ADDON]', ...args), { reference: true });

  // // preload addon code
  // const script = await isolate.compileScript(`
  //   function render(input) {
  //     const props = JSON.parse(input);
  //     return '<div>Rendered product: ' + props.product.name + '</div>';
  //   }

  //   globalThis.render = render;
  // `);

  // await script.run(context);

  // const result = await context.global.get('render', { reference: true });
  // const html = await result.apply(undefined, [ JSON.stringify({ product }) ], { result: 'utf8' });
  // return html;
}

module.exports = { getOrCreateIsolate };

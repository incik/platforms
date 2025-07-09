import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["addons/picolo/greeter.server.jsx"],
  bundle: true,
  platform: "node",
  format: "iife", // required for `globalThis.render = ...` to work
  target: ["es2020"],
  outfile: "public/addons-built/picolo.server.js",
  globalName: "Plugin",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  jsxFactory: "h",
  jsxFragment: "Fragment",
  inject: [
    "scripts/fetch.js",
    "scripts/jsx-json-factory.js",
    "scripts/process-shim.js",
  ],
  banner: {
    js: "(() => {",
  },
  footer: {
    js: `
      globalThis.render = Plugin.default;
    })();`,
  },
});

await esbuild.build({
  entryPoints: ["addons/picolo/greeter.client.jsx"],
  outfile: "public/addons-built/picolo.client.js",
  external: ["react", "react-dom"],
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2018",
});

await esbuild.build({
  entryPoints: ["addons/kvak/clock.client.jsx"],
  outfile: "public/addons-built/kvak.client.js",
  external: ["react", "react-dom"],
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2018",
});

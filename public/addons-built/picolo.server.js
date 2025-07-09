(() => {
"use strict";
var Plugin = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // addons/picolo/greeter.server.jsx
  var greeter_server_exports = {};
  __export(greeter_server_exports, {
    Greeter: () => Greeter
  });

  // scripts/fetch.js
  async function fetch(url, options) {
    const res = await __fetch.apply(void 0, [url], {
      result: { promise: true, externalCopy: true }
    });
    return res.copy();
  }

  // scripts/jsx-json-factory.js
  function h(type, props, ...children) {
    const flatChildren = children.flat(Infinity).filter((c) => c !== void 0 && c !== null);
    const { key, ref, ...rest } = props || {};
    const normalizedProps = { ...rest };
    if (flatChildren.length === 1) {
      normalizedProps.children = flatChildren[0];
    } else if (flatChildren.length > 1) {
      normalizedProps.children = flatChildren;
    }
    const element = {
      type,
      props: normalizedProps
    };
    if (key !== void 0) element.key = key;
    if (ref !== void 0) element.ref = ref;
    return element;
  }

  // addons/picolo/greeter.server.jsx
  async function Greeter() {
    const product = {
      name: "Picoloddddddd",
      price: 19.99
    };
    log("Rendering Picolo addon with props:", product);
    try {
      const URL = "https://jsonplaceholder.typicode.com/todos/2";
      const data = await fetch(URL);
      log("Fetched data", data);
      return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h1", { className: "text-2xl font-bold" }, product.name), /* @__PURE__ */ h("p", { className: "text-lg" }, "Price: $", product.price), /* @__PURE__ */ h("p", { className: "mt-3 text-gray-600" }, "Fetched data: ", JSON.stringify(data)));
    } catch (e) {
      log("Fetch failed:", e.message);
    }
  }
  return __toCommonJS(greeter_server_exports);
})();

      globalThis.render = Plugin.Greeter;
    })();

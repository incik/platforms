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
      if ((from && typeof from === "object") || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, {
              get: () => from[key],
              enumerable:
                !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
            });
      }
      return to;
    };
    var __toCommonJS = (mod) =>
      __copyProps(__defProp({}, "__esModule", { value: true }), mod);

    // addons/kvak/kvakus.server.jsx
    var kvakus_server_exports = {};
    __export(kvakus_server_exports, {
      default: () => Kvakus,
    });

    // scripts/jsx-json-factory.js
    function h(type, props, ...children) {
      const flatChildren = children
        .flat(Infinity)
        .filter((c) => c !== void 0 && c !== null);
      const { key, ref, ...rest } = props || {};
      const normalizedProps = { ...rest };
      if (flatChildren.length === 1) {
        normalizedProps.children = flatChildren[0];
      } else if (flatChildren.length > 1) {
        normalizedProps.children = flatChildren;
      }
      if (typeof type === "function") {
        const result = type({ ...normalizedProps, key, ref });
        return result;
      }
      const element = {
        type,
        props: normalizedProps,
      };
      if (key !== void 0) element.key = key;
      if (ref !== void 0) element.ref = ref;
      return element;
    }

    // addons/kvak/kvakus.server.jsx
    async function Kvakus() {
      return /* @__PURE__ */ h(
        "div",
        { className: "client-addon" },
        /* @__PURE__ */ h("h2", { style: { color: "red" } }, " Kvakus")
      );
    }
    return __toCommonJS(kvakus_server_exports);
  })();

  globalThis.render = Plugin.default;
})();

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

    // addons/picolo/greeter.server.jsx
    var greeter_server_exports = {};
    __export(greeter_server_exports, {
      Caputo: () => Caputo,
      Greeter: () => Greeter,
      User: () => User,
      default: () => greeter_server_default,
    });

    // scripts/fetch.js
    async function fetch(url, options) {
      const res = await __fetch.apply(void 0, [url], {
        result: { promise: true, externalCopy: true },
      });
      return res.copy();
    }

    // scripts/jsx-json-factory.js
    async function h(type, props, ...children) {
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
    var Fragment = (props) => {
      return {
        type: "Fragment",
        props: props || {},
      };
    };

    // addons/picolo/greeter.server.jsx
    var User = async ({ name, username, email, address }) => {
      return /* @__PURE__ */ await h(
        "div",
        { className: "user-item" },
        /* @__PURE__ */ await h(
          "h2",
          { className: "text-xl font-semibold" },
          name
        ),
        /* @__PURE__ */ await h(
          "p",
          { className: "text-sm text-gray-600" },
          "Username: ",
          username
        ),
        /* @__PURE__ */ await h(
          "p",
          { className: "text-sm text-gray-600" },
          "Email: ",
          email
        ),
        /* @__PURE__ */ await h(
          "p",
          { className: "text-sm text-gray-600" },
          "Address: ",
          address.street,
          ", ",
          address.city
        )
      );
    };
    var Caputo = async () => {
      const URL = "https://jsonplaceholder.typicode.com/users/";
      const data = await fetch(URL);
      log("Fetched data", data);
      return /* @__PURE__ */ await h(
        "div",
        { className: "client-addon" },
        /* @__PURE__ */ await h("h2", { style: { color: "green" } }, "Caputo"),
        Object.keys(data).length > 0
          ? /* @__PURE__ */ await h(
              Fragment,
              null,
              /* @__PURE__ */ await h(
                "h2",
                { className: "text-xl font-semibold mt-4" },
                "Users:"
              ),
              /* @__PURE__ */ await h(
                "div",
                {
                  className:
                    "flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
                },
                await Promise.all(
                  data.map(
                    async (user) =>
                      /* @__PURE__ */ await h(User, {
                        key: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        address: user.address,
                      })
                  )
                )
              ),
              " "
            )
          : /* @__PURE__ */ await h(
              "div",
              {
                className:
                  "error border border-red-500 p-4 bg-red-100 text-red-700",
              },
              /* @__PURE__ */ await h("p", null, "No data available")
            )
      );
    };
    async function Greeter({ foo }) {
      const product = {
        name: "Picoloddddddd",
        price: 19.99,
      };
      log("Rendering Picolo addon with props:", product);
      log("Foo prop:", foo);
      try {
        try {
          return /* @__PURE__ */ await h(
            "div",
            null,
            /* @__PURE__ */ await h(Caputo, null),
            /* @__PURE__ */ await h(
              "h1",
              { className: "text-2xl font-bold" },
              product.name
            ),
            /* @__PURE__ */ await h(
              "p",
              { className: "text-lg" },
              "Price: $",
              product.price
            )
          );
        } catch (e) {
          error("Error rendering data:", e.message);
          return /* @__PURE__ */ await h(
            "div",
            {
              className:
                "error border border-red-500 p-4 bg-red-100 text-red-700",
            },
            /* @__PURE__ */ await h("p", null, "Server error: ", e.message)
          );
        }
      } catch (e) {
        error("Fetch failed:", e.message);
      }
    }
    Greeter.schema = {
      id: "picolo",
      label: "Picoloddddddd",
      fields: {},
      defaultValues: {},
    };
    var greeter_server_default = Greeter;
    return __toCommonJS(greeter_server_exports);
  })();

  globalThis.render = Plugin.default;
})();

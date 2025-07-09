// addons/picolo/greeter.client.jsx
function Greeter() {
  const [count, setCount] = React.useState(0);
  return /* @__PURE__ */ React.createElement("div", { className: "client-addon" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      style: {
        border: "1px dashed orange",
        backgroundColor: "red",
        padding: "5px"
      },
      onClick: () => setCount(count + 1)
    },
    "Clicked ",
    count,
    " times"
  ));
}
export {
  Greeter as default
};

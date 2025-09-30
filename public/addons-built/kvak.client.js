// addons/kvak/clock.client.jsx
function KvakClock() {
  const [time, setTime] = React.useState(
    /* @__PURE__ */ new Date().toLocaleTimeString()
  );
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(/* @__PURE__ */ new Date().toLocaleTimeString());
    }, 1e3);
    return () => clearInterval(intervalId);
  }, []);
  return /* @__PURE__ */ React.createElement(
    "div",
    { className: "client-addon" },
    /* @__PURE__ */ React.createElement(
      "h2",
      { style: { color: "red" } },
      "Kvak Clock"
    ),
    /* @__PURE__ */ React.createElement(
      "p",
      { style: { fontSize: "20px" } },
      time
    )
  );
}
KvakClock.schema = {
  id: "KvakClock",
  label: "Ducky Clock",
  fields: {
    color: {
      type: "color",
      label: "Color",
      description: "Color of the clock label",
    },
  },
  defaultValues: {
    color: "green",
  },
};
var clock_client_default = KvakClock;
export { KvakClock, clock_client_default as default };

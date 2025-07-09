export function KvakClock() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="client-addon">
      <h2 style={{ color: "green" }}>Kvak Clock</h2>
      <p style={{ fontSize: "20px" }}>{time}</p>
    </div>
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

export default KvakClock;

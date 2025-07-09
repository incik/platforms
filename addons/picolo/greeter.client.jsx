export default function Greeter() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="client-addon">
      <button
        style={{
          border: "1px dashed orange",
          backgroundColor: "red",
          padding: "5px",
        }}
        onClick={() => setCount(count + 1)}
      >
        Clicked {count} times
      </button>
    </div>
  );
}

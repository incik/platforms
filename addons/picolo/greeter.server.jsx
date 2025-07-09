export async function Greeter() {
  const product = {
    name: "Picoloddddddd",
    price: 19.99,
  };

  log("Rendering Picolo addon with props:", product);

  try {
    const URL = "https://jsonplaceholder.typicode.com/todos/2";
    const data = await fetch(URL);

    log("Fetched data", data);

    return (
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-lg">Price: ${product.price}</p>
        <p className="mt-3 text-gray-600">
          Fetched data: {JSON.stringify(data)}
        </p>
      </div>
    );
  } catch (e) {
    log("Fetch failed:", e.message);
  }
}

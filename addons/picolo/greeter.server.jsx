export const User = ({ name, username, email, address }) => {
  return (
    <div className="user-item">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">Username: {username}</p>
      <p className="text-sm text-gray-600">Email: {email}</p>
      <p className="text-sm text-gray-600">
        Address: {address.street}, {address.city}
      </p>
    </div>
  );
};

export async function Greeter() {
  const product = {
    name: "Picoloddddddd",
    price: 19.99,
  };

  log("Rendering Picolo addon with props:", product);

  try {
    const URL = "https://jsonplaceholder.typicode.com/users/";
    const data = await fetch(URL);

    // log("Fetched data", data);

    try {
      return (
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg">Price: ${product.price}</p>

          <h2 className="text-xl font-semibold mt-4">Users:</h2>
          <div className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((user) => (
              <User
                key={user.id}
                name={user.name}
                username={user.username}
                email={user.email}
                address={user.address}
              />
            ))}
          </div>
        </div>
      );
    } catch (e) {
      error("Error rendering data:", e.message);
      return (
        <div className="error border border-red-500 p-4 bg-red-100 text-red-700">
          <p>Server error: {e.message}</p>
        </div>
      );
    }
  } catch (e) {
    error("Fetch failed:", e.message);
  }
}

// ------------------------------
// addons-built/picolo.js (compiled ahead of time)
// ------------------------------

async function fetch(url, options) {
  const res = await __fetch.apply(undefined, [url], {
    result: { promise: true, externalCopy: true },
  });

  return res.copy();
}

async function render(input) {
  const props = JSON.parse(input);
  const product = props.product;

  log("Rendering Picolo addon with props:", product);

  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    log("Fetched data", data);

    return `<div>
      <h1 class="text-2xl font-bold">${product.name}</h1>
      <p class="text-lg">Price: $${product.price}</p>
      <p class="mt-3 text-gray-600">Fetched data: ${JSON.stringify(data)}</p>
    </div>`;
  } catch (e) {
    log("Fetch failed:", e.message);
  }
}

globalThis.render = render;

export async function fetch(url, options) {
  const res = await __fetch.apply(undefined, [url], {
    result: { promise: true, externalCopy: true },
  });

  return res.copy();
}

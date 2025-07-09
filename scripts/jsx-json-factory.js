// scripts/jsx-json-factory.ts
export function h(type, props, ...children) {
  // Flatten children (some may be arrays)
  const flatChildren = children
    .flat(Infinity)
    .filter((c) => c !== undefined && c !== null);

  // Extract key and ref from props (they should not go into props.props)
  const { key, ref, ...rest } = props || {};
  const normalizedProps = { ...rest };

  if (flatChildren.length === 1) {
    normalizedProps.children = flatChildren[0];
  } else if (flatChildren.length > 1) {
    normalizedProps.children = flatChildren;
  }

  // If type is a function, call it with props so it can return an element
  // This allows us to define multiple components in a single file and use them
  if (typeof type === "function") {
    return type({ ...normalizedProps, key, ref });
  }

  const element = {
    type,
    props: normalizedProps,
  };

  if (key !== undefined) element.key = key;
  if (ref !== undefined) element.ref = ref;

  return element;
}

export const Fragment = (props) => {
  return {
    type: "Fragment",
    props: props || {},
  };
};

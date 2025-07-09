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

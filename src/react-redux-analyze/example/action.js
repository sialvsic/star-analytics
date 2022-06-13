export function add(value) {
  return {
    type: 'ADD',
    value: value,
  };
}

export function minus(value) {
  return {
    type: 'MINUS',
    value: value,
  };
}

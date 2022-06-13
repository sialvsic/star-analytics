// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#How_reduce()_works

const arr = [1, 2, 3, 4, 5];

const newArr = arr.reduce((a, b) => {
  return a + b;
});

console.log(arr);
console.log(newArr);

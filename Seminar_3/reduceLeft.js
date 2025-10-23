const reduce = (array, reducer, initialValue) => {
  const hasInitial = arguments.length >= 3;

  if (!hasInitial && array.length === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let acc = hasInitial ? initialValue : array[0];
  let i = hasInitial ? 0 : 1;

  for (; i < array.length; i++) {
    acc = reducer(acc, array[i], i, array);
  }
  return acc;
};

const a = [1, 2, 3, 4, 5];

console.log(reduce(a, (sum, x) => sum + x, 0));

console.log(reduce(a, (prod, x) => prod * x, 1));

console.log(reduce(a, (max, x) => (x > max ? x : max)));

console.log(reduce([["a"], ["b", "c"]], (acc, x) => acc.concat(x), []));

console.log(
  reduce("abacad".split(""), (m, ch) => ((m[ch] = (m[ch] || 0) + 1), m), {})
);

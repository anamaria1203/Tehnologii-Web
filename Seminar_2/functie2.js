function interleave(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return -1;
  if (a.length !== b.length) return -1;

  const out = [];
  for (let i = 0; i < a.length; i++) {
    out.push(a[i]);
    out.push(b[i]);
  }
  return out;
}

console.log(interleave([1, 2, 3], ["a", "b", "c"]));
console.log(interleave([], []));
console.log(interleave([10], [20]));
console.log(interleave([1, 2], ["x"]));

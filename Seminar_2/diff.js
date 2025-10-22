function countDifferentChars(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return -1;
  if (a.length !== b.length) return -1;

  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diff++;
  }
  return diff;
}

console.log(countDifferentChars("abc", "abx"));
console.log(countDifferentChars("aaaa", "bbbb"));
console.log(countDifferentChars("test", "test"));
console.log(countDifferentChars("kitten", "sitting"));

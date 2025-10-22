function copyNumbers(numbers) {
  const out = [];
  for (let i = 0; i < numbers.length; i++) {
    out.push(numbers[i]);
  }
  return out;
}

console.log(copyNumbers([1, 2, 3]));
console.log(copyNumbers([]));
console.log(copyNumbers([10, -5, 7, 0]));

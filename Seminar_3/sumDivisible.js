const sumDivisibleBy = (arr, divisor) =>
  arr
    .filter((n) => Number.isFinite(n) && divisor !== 0 && n % divisor === 0)
    .reduce((sum, n) => sum + n, 0);

console.log(sumDivisibleBy([3, 6, 10, 12, 15], 3));
console.log(sumDivisibleBy([2, 4, 5, 8, 11], 2));
console.log(sumDivisibleBy([1, 5, 7], 4));

const average = (arr) => arr.reduce((sum, x) => sum + x, 0) / arr.length;

console.log(average([1, 2, 3, 4]));
console.log(average([10]));

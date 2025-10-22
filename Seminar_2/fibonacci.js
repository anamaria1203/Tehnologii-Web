const fib = (n) => {
  n = Number(n);
  if (!Number.isInteger(n) || n < 0)
    throw new Error("n trebuie să fie un întreg ≥ 0");

  if (n === 0) return 0n;
  if (n === 1) return 1n;

  let a = 0n,
    b = 1n;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
};

if (process.argv.length <= 2) {
  console.log("not enough parameters");
} else {
  try {
    const n = process.argv[2];
    const result = fib(n);
    console.log(result.toString());
  } catch (e) {
    console.log(e.message);
  }
}

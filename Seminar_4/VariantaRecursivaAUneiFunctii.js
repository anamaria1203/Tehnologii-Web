function expMemoGen() {
  const cache = new Map();

  const key = (a, n) => `${a}|${n}`;

  const power = (a, n) => {
    if (!Number.isFinite(a) || !Number.isInteger(n)) {
      throw new Error("a trebuie să fie număr finit, iar n întreg");
    }

    if (n === 0) return 1;
    if (n < 0) return 1 / power(a, -n);

    const k = key(a, n);
    if (cache.has(k)) {
      console.log("found", `${a}^${n}`);
      return cache.get(k);
    }

    let val;
    if (n % 2 === 0) {
      console.log("calculated half for", `${a}^${n}`);
      const half = power(a, Math.floor(n / 2));
      val = half * half;
    } else {
      console.log("calculated step for", `${a}^${n}`);
      const prev = power(a, n - 1);
      val = a * prev;
    }

    cache.set(k, val);
    return val;
  };

  return power;
}

const pow = expMemoGen();

console.log("2^10 =", pow(2, 10));
console.log("2^9  =", pow(2, 9));
console.log("3^5  =", pow(3, 5));
try {
  console.log("2^-3 =", pow(2, -3));
} catch (e) {
  console.error(e.message);
}

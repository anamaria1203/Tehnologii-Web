function increaseSalary(salaries, percent) {
  if (!Array.isArray(salaries)) {
    throw new TypeError("Primul parametru trebuie să fie un array.");
  }
  if (typeof percent !== "number" || !Number.isFinite(percent)) {
    throw new TypeError(
      "Al doilea parametru trebuie să fie un număr finit (procent)."
    );
  }

  for (const s of salaries) {
    if (typeof s !== "number" || !Number.isFinite(s)) {
      throw new TypeError("Toate salariile trebuie să fie numere finite.");
    }
  }

  const factor = 1 + percent / 100;

  return salaries.map((s) => +(s * factor).toFixed(2));
}

try {
  console.log(increaseSalary([3000, 4500, 5200], 10));

  console.log(increaseSalary([], 5));
} catch (err) {
  console.error("Eroare:", err.message);
}

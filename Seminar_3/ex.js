const birthYears = [2010, 2008, 2002, 1999, 1981, 2026, 1975];

const agesOver18 = (years, now = new Date().getFullYear()) =>
  years.map((y) => now - y).filter((age) => Number.isFinite(age) && age >= 18);

console.log(agesOver18(birthYears));

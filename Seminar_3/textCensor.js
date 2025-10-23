const maskWord = (w) =>
  w.length <= 2
    ? "*".repeat(w.length)
    : w[0] + "*".repeat(w.length - 2) + w[w.length - 1];

const escapeRx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const censorText = (s, dict) => {
  if (!Array.isArray(dict) || dict.length === 0) return s;
  const pattern = `\\b(${dict.map(escapeRx).join("|")})\\b`;
  const re = new RegExp(pattern, "gi");
  return s.replace(re, (m) => maskWord(m));
};

console.log(censorText("javascript este minunat", ["este"]));

console.log(censorText("ana are mere si pere", ["ana", "mere"]));

console.log(censorText("Este bine, ESTe corect.", ["este"]));

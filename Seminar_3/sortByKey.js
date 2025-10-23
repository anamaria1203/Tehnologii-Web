/**
 * Sortează o listă de obiecte după cheia dată.
 * @param {Array<object>} arr
 * @param {string} key
 * @param {object} opts
 * @returns {Array<object>}
 */
const sortByKey = (arr, key, { asc = true, caseInsensitive = true } = {}) => {
  const get = (obj) => obj?.[key];

  const cmp = (a, b) => {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    if (typeof a === "string" && typeof b === "string") {
      if (caseInsensitive) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }
      return a.localeCompare(b);
    }

    const aDate =
      a instanceof Date
        ? a
        : typeof a === "string" && !isNaN(Date.parse(a))
        ? new Date(a)
        : null;
    const bDate =
      b instanceof Date
        ? b
        : typeof b === "string" && !isNaN(Date.parse(b))
        ? new Date(b)
        : null;
    if (aDate && bDate) return aDate - bDate;

    const an = Number(a),
      bn = Number(b);
    if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;

    return String(a).localeCompare(String(b));
  };

  const sign = asc ? 1 : -1;
  return arr.slice().sort((x, y) => sign * cmp(get(x), get(y)));
};

const people = [
  { name: "Ana", age: 22, joined: "2024-11-12" },
  { name: "maria", age: 19, joined: "2023-05-01" },
  { name: "George", age: 31, joined: "2025-02-10" },
  { name: "Ion", age: null },
];

console.log("după name (asc, case-insensitive):");
console.log(sortByKey(people, "name"));

console.log("după age (desc):");
console.log(sortByKey(people, "age", { asc: false }));

console.log("după joined (date asc):");
console.log(sortByKey(people, "joined", { asc: true }));

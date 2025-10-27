Number.prototype.times = function (fn) {
  if (typeof fn !== "function")
    throw new TypeError("times: argumentul trebuie să fie funcție");

  const n = Math.max(0, Math.floor(Number(this)));

  for (let i = 0; i < n; i++) {
    fn(i);
  }
};
(3).times(() => console.log("Salut!"));

(5).times((i) => console.log(`pas ${i}`));

(0).times(() => console.log("nu se vede"));
(-2).times(() => console.log("negativ"));
(2.9).times(() => console.log("rotunjit"));

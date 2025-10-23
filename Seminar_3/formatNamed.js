const formatNamed = (template, vars = {}) =>
  template.replace(/\{([^{}]+)\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(vars, key)
      ? String(vars[key])
      : `{${key}}`
  );

console.log(
  formatNamed("un {substantiv} este {adjectiv}", {
    substantiv: "căluț",
    adjectiv: "drăguț",
  })
);

console.log(formatNamed("{x} + {x} = {rez}", { x: 2, rez: 4 }));

console.log(formatNamed("bună, {nume}! azi e {zi}", { nume: "Ana" }));

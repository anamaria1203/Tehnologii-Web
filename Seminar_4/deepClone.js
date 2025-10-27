function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);

  if (value instanceof Date) return new Date(value.getTime());

  if (value instanceof RegExp) {
    const re = new RegExp(value.source, value.flags);
    re.lastIndex = value.lastIndex;
    return re;
  }

  if (value instanceof ArrayBuffer) return value.slice(0);
  if (value instanceof DataView)
    return new DataView(
      deepClone(value.buffer),
      value.byteOffset,
      value.byteLength
    );

  if (ArrayBuffer.isView(value) && !(value instanceof DataView)) {
    const Ctor = value.constructor;
    return new Ctor(value);
  }

  if (value instanceof Map) {
    const out = new Map();
    seen.set(value, out);
    for (const [k, v] of value.entries()) {
      out.set(deepClone(k, seen), deepClone(v, seen));
    }
    return out;
  }

  if (value instanceof Set) {
    const out = new Set();
    seen.set(value, out);
    for (const v of value.values()) {
      out.add(deepClone(v, seen));
    }
    return out;
  }

  if (Array.isArray(value)) {
    const out = [];
    seen.set(value, out);
    for (let i = 0; i < value.length; i++) {
      out[i] = deepClone(value[i], seen);
    }
    return out;
  }

  const proto = Object.getPrototypeOf(value);
  const out = Object.create(proto);
  seen.set(value, out);

  const keys = Reflect.ownKeys(value);
  for (const key of keys) {
    const desc = Object.getOwnPropertyDescriptor(value, key);
    if ("value" in desc) {
      desc.value = deepClone(desc.value, seen);
    }
    Object.defineProperty(out, key, desc);
  }
  return out;
}

const obj = {
  n: 1,
  s: "hi",
  b: true,
  d: new Date(),
  r: /ab+c/gi,
  a: [1, { x: 2 }],
  m: new Map([["k", { z: 3 }]]),
  set: new Set([1, 2, { y: 4 }]),
  buf: new Uint8Array([1, 2, 3]),
};
obj.self = obj;
const copy = deepClone(obj);

console.log(copy !== obj);
console.log(copy.a !== obj.a && copy.a[1] !== obj.a[1]);
console.log(copy.m.get("k") !== obj.m.get("k"));
console.log(copy.set !== obj.set);
console.log(copy.self === copy);

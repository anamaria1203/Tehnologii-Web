const sampleString = "the quick brown fox jumps over the lazy dog";

const letterFreq = (text) => {
  const result = {};
  let total = 0;

  for (const ch of text.toLowerCase()) {
    if (ch === " ") continue;
    if (!/[a-z]/.test(ch)) continue;

    total++;
    result[ch] = (result[ch] || 0) + 1;
  }

  for (const k in result) {
    result[k] = result[k] / total;
  }
  return result;
};

console.log(letterFreq(sampleString));

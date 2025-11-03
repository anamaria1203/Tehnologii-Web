import CryptoJS from "crypto-js";

const word1 = "word1";

const encoded = CryptoJS.AES.encrypt(
  JSON.stringify(word1),
  "secret key 123"
).toString();
console.log("encoded:", encoded);

const bytes = CryptoJS.AES.decrypt(encoded, "secret key 123");
const decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
console.log("decoded:", decoded);

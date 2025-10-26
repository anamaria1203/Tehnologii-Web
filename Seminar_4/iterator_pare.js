class Stream {
  #value;
  #nextvalue;
  static #count = 0;

  constructor(value, nextValue) {
    this.#value = value;
    this.#nextvalue = nextValue;
    Stream.#count++;
  }

  get value() { return this.#value; }

  get next() {
    this.#value = this.#nextvalue(this.#value);
    return this.#value;
  }

  static get count() { return Stream.#count; }
}

// ------------------------------
// Șirul de numere pare în creștere
// ------------------------------
class EvenStream extends Stream {
  constructor(start) {
    const firstEven = start % 2 === 0 ? start : start + 1;
    // punem cu 2 mai mic ca să obținem firstEven la PRIMUL apel .next
    super(firstEven - 2, v => v + 2);
  }
}


const evensFrom5 = new EvenStream(5);   
const evensFrom10 = new EvenStream(10); 

for (let i = 0; i < 5; i++) {
  console.log(`from 5 -> ${evensFrom5.next}`);
  console.log(`from 10 -> ${evensFrom10.next}`);
}

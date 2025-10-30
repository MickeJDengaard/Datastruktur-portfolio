import StaticArray from "../staticarray/staticarray.js";

export default class DynamicArray {
  #data;     // det underliggende StaticArray
  #size;     // hvor mange elementer der rent faktisk er brugt

  constructor(capacity = 4) {
    this.#data = new StaticArray(capacity);
    this.#size = 0;
  }


  add(item) {
    if (this.#size === this.#data.length) {
      this.grow();
    }
    this.#data.set(this.#size, item);
    this.#size++;
  }

  get(index) {
    this.#checkIndex(index);
    return this.#data.get(index);
  }

  set(index, item) {
    this.#checkIndex(index);
    this.#data.set(index, item);
  }

  size() {
    return this.#size;
  }

  capacity() {
    return this.#data.length;
  }


  insert(index, item) {
    if (index < 0 || index > this.#size) throw new RangeError("Index out of range");
    if (this.#size === this.#data.length) this.grow();

    // flyt elementer en plads til højre
    for (let i = this.#size; i > index; i--) {
      this.#data.set(i, this.#data.get(i - 1));
    }

    this.#data.set(index, item);
    this.#size++;
  }

  remove(index) {
    this.#checkIndex(index);
    for (let i = index; i < this.#size - 1; i++) {
      this.#data.set(i, this.#data.get(i + 1));
    }
    this.#size--;
  }

  clear() {
    this.#size = 0;
  }



  grow() {
    const newCapacity = this.#data.length * 2;
    const newArray = new StaticArray(newCapacity);

    for (let i = 0; i < this.#size; i++) {
      newArray.set(i, this.#data.get(i));
    }

    this.#data = newArray;
  }

  #checkIndex(index) {
    if (index < 0 || index >= this.#size) {
      throw new RangeError("Index out of range");
    }
  }
  

}



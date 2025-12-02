import nodeClass from "./nodeClass.js";

export class Tree {
  #root;

  constructor(rootValue = null) {
    this.#root = rootValue instanceof nodeClass ? rootValue : new nodeClass(rootValue);
  }

  get root() {
    return this.#root;
  }

  addValue(value) {
    const newNode = new nodeClass(value);
    this.#root.appendChild(newNode);
    return newNode;
  }

  findValue(value) {
    const queue = [this.#root];

    while (queue.length > 0) {
      const current = queue.shift();
      if (current.value === value) return current;

      for (const child of current.childNodes) {
        queue.push(child);
      }
    }
    return null;
  }

  removeValue(value) {
    const node = this.findValue(value);
    if (!node || !node.parent) return false;

    node.parent.removeChild(node);
    return true;
  }

  printTree() {
    this.#root.dump();
  }
}

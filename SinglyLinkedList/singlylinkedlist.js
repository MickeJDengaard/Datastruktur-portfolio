function Node(data) {
  return { data, next: null };
}

export default class SinglyLinkedList {
  head;
  #size;

  constructor() {
    this.head = null;
    this.#size = 0;
  }


  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    this.#size = count;
    return this.#size;
  }

  clear() {
    this.head = null;
    this.#size = 0;
  }

  printList() {
    let current = this.head;
    let output = "";

    while (current) {
      output += `[${current.data}] -> `;
      current = current.next;
    }

    output += "null";
    console.log(output);
  }


  add(data) {
    const newNode = Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = newNode;
    }

    this.#size++;
  }

  insert(index, data) {
    if (index < 0 || index > this.#size) return false;

    const newNode = Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }

    this.#size++;
    return true;
  }

  insertBefore(node, data) {
    if (!node) return false;
    const newNode = Node(data);

    if (this.head === node) {
      newNode.next = this.head;
      this.head = newNode;
      this.#size++;
      return true;
    }

    let current = this.head;
    while (current && current.next !== node) {
      current = current.next;
    }

    if (!current) return false;
    newNode.next = node;
    current.next = newNode;
    this.#size++;
    return true;
  }

  insertAfter(node, data) {
    if (!node) return false;
    const newNode = Node(data);

    newNode.next = node.next;
    node.next = newNode;
    this.#size++;
    return true;
  }


  get(index) {
    const node = this.getNode(index);
    return node ? node.data : null;
  }

  getNode(index) {
    if (index < 0) return null;
    let current = this.head;
    let i = 0;
    while (current && i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    if (!this.head) return null;
    let current = this.head;
    while (current.next) current = current.next;
    return current;
  }

  getLast() {
    const lastNode = this.getLastNode();
    return lastNode ? lastNode.data : null;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    if (!node || node === this.head) return null;
    let current = this.head;
    while (current && current.next !== node) current = current.next;
    return current;
  }


  set(index, data) {
    const node = this.getNode(index);
    if (!node) return false;
    node.data = data;
    return true;
  }


  remove(index) {
    if (index < 0 || !this.head) return null;

    if (index === 0) return this.removeFirst();

    let current = this.head;
    for (let i = 0; i < index - 1 && current.next; i++) current = current.next;

    if (!current.next) return null;

    const removed = current.next;
    current.next = removed.next;
    this.#size--;
    return removed.data;
  }

  removeFirst() {
    if (!this.head) return null;
    const removed = this.head;
    this.head = this.head.next;
    this.#size--;
    return removed.data;
  }

  removeLast() {
    if (!this.head) return null;

    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      this.#size = 0;
      return data;
    }

    let current = this.head;
    while (current.next.next) current = current.next;

    const data = current.next.data;
    current.next = null;
    this.#size--;
    return data;
  }

  removeNode(node) {
    if (!node || !this.head) return null;

    if (this.head === node) {
      const data = this.head.data;
      this.head = this.head.next;
      this.#size--;
      return data;
    }

    let current = this.head;
    while (current.next && current.next !== node) current = current.next;

    if (!current.next) return null;

    const data = current.next.data;
    current.next = current.next.next;
    this.#size--;
    return data;
  }
}

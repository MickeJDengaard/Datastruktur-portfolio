export default class DoublyLinkedList {
  head;
  tail;
  #size;

  constructor() {
    this.head = null;
    this.tail = null;
    this.#size = 0;
  }

  #createNode(data) {
    return { data, next: null, prev: null };
  }

  printList() {
    let node = this.head;
    let i = 0;
    while (node) {
      console.log(
        `Node ${i}: data=${node.data}, prev=${node.prev ? node.prev.data : null}, next=${node.next ? node.next.data : null}`
      );
      node = node.next;
      i++;
    }
    console.log(`size=${this.size()}\n`);
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  getNode(index) {
    if (index < 0 || index >= this.#size) return null;
    let node = this.head;
    for (let i = 0; i < index; i++) node = node.next;
    return node;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    return this.tail;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    return node ? node.prev : null;
  }

  get(index) {
    const node = this.getNode(index);
    return node ? node.data : undefined;
  }

  getFirst() {
    return this.head ? this.head.data : undefined;
  }

  getLast() {
    return this.tail ? this.tail.data : undefined;
  }

  // ---------- SET ----------
  set(index, data) {
    const node = this.getNode(index);
    if (node) node.data = data;
  }

  addFirst(data) {
    const newNode = this.#createNode(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.#size++;
  }

  addLast(data) {
    const newNode = this.#createNode(data);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.#size++;
  }

  insert(index, data) {
    if (index <= 0) return this.addFirst(data);
    if (index >= this.#size) return this.addLast(data);
    const node = this.getNode(index);
    this.insertBeforeNode(node, data);
  }

  insertBefore(index, data) {
    const node = this.getNode(index);
    if (!node) return this.addFirst(data);
    this.insertBeforeNode(node, data);
  }

  insertAfter(index, data) {
    const node = this.getNode(index);
    if (!node) return this.addLast(data);
    this.insertAfterNode(node, data);
  }

  insertBeforeNode(node, data) {
    if (!node) return;
    const newNode = this.#createNode(data);
    newNode.next = node;
    newNode.prev = node.prev;

    if (node.prev) node.prev.next = newNode;
    else this.head = newNode;

    node.prev = newNode;
    this.#size++;
  }

  insertAfterNode(node, data) {
    if (!node) return;
    const newNode = this.#createNode(data);
    newNode.prev = node;
    newNode.next = node.next;

    if (node.next) node.next.prev = newNode;
    else this.tail = newNode;

    node.next = newNode;
    this.#size++;
  }

  remove(index) {
    const node = this.getNode(index);
    return node ? this.removeNode(node) : undefined;
  }

  removeFirst() {
    if (!this.head) return undefined;
    return this.removeNode(this.head);
  }

  removeLast() {
    if (!this.tail) return undefined;
    return this.removeNode(this.tail);
  }

  removeNode(node) {
    if (!node) return undefined;

    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    this.#size--;
    return node.data;
  }

  swap(nodeA, nodeB) {
    const temp = nodeA.data;
    nodeA.data = nodeB.data;
    nodeB.data = temp;
  }
}

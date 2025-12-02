export default class nodeClass {
  #_parent = null;
  #_childNodes = [];
  #_value;

  constructor(value, parent = null, childNodes = null) {
    this.#_parent = parent;
    this.#_childNodes = childNodes || [];
    this.#_value = value;
  }

  get value() {
    return this.#_value;
  }

  get childNodes() {
    return this.#_childNodes;
  }

  get parent() {
    return this.#_parent;
  }

  set parent(node) {
    this.#_parent = node;
  }

  firstChild() {
    return this.#_childNodes[0] || null;
  }

  lastChild() {
    return this.#_childNodes[this.#_childNodes.length - 1] || null;
  }

  hasChildNodes() {
    return this.#_childNodes.length > 0;
  }

  appendChild(child) {
    child.parent = this;
    this.#_childNodes.push(child);
  }

  removeChild(child) {
    const index = this.#_childNodes.indexOf(child);
    if (index === -1) return;
    this.#_childNodes.splice(index, 1);
    child.parent = null;
  }

  rreplaceChild(newChild, oldChild) {
  const index = this.#_childNodes.indexOf(oldChild);
  if (index === -1) return;

  // Fjern forbindelse fra oldChild til parent
  oldChild.parent = null;

  // Sæt ny parent
  newChild.parent = this;

  // Replace
  this.#_childNodes[index] = newChild;
}


  dump(indent = 0) {
    console.log(" ".repeat(indent) + "- " + this.#_value);
    for (const child of this.#_childNodes) {
      child.dump(indent + 2);
    }
  }
}

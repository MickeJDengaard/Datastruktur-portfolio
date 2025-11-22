export default class Grid {
  #arr;
  #rows;
  #cols;

  constructor(rows, cols) {
    this.#rows = rows;
    this.#cols = cols;
    this.#arr = new Array(rows * cols).fill(0);
  }

  check({ row, col }) {
    if (row < 0 || row >= this.#rows || col < 0 || col >= this.#cols) {
      return undefined;
    }
  }

  indexFor({ row, col }) {
    return row * this.#cols + col;
  }

  rowColFor(index) {
    const row = Math.floor(index / this.#cols);
    const col = index % this.#cols;
    return { row, col };
  }

  get({ row, col }) {
    if (this.check({ row, col }) === undefined) return undefined;
    return this.#arr[this.indexFor({ row, col })];
  }

  set({ row, col }, value) {
    if (this.check({ row, col }) === undefined) return;
    this.#arr[this.indexFor({ row, col })] = value;
  }

  north({ row, col }) {
    if (row - 1 < 0) return undefined;
    return this.#makeCell(row - 1, col);
  }

  south({ row, col }) {
    if (row + 1 >= this.#rows) return undefined;
    return this.#makeCell(row + 1, col);
  }

  west({ row, col }) {
    if (col - 1 < 0) return undefined;
    return this.#makeCell(row, col - 1);
  }

  east({ row, col }) {
    if (col + 1 >= this.#cols) return undefined;
    return this.#makeCell(row, col + 1);
  }

  northwest({ row, col }) {
    if (row - 1 < 0 || col - 1 < 0) return undefined;
    return this.#makeCell(row - 1, col - 1);
  }

  northeast({ row, col }) {
    if (row - 1 < 0 || col + 1 >= this.#cols) return undefined;
    return this.#makeCell(row - 1, col + 1);
  }

  southwest({ row, col }) {
    if (row + 1 >= this.#rows || col - 1 < 0) return undefined;
    return this.#makeCell(row + 1, col - 1);
  }

  southeast({ row, col }) {
    if (row + 1 >= this.#rows || col + 1 >= this.#cols) return undefined;
    return this.#makeCell(row + 1, col + 1);
  }

  neighbours({ row, col }) {
    const list = [];

    const dirs = [
      this.north({ row, col }),
      this.south({ row, col }),
      this.west({ row, col }),
      this.east({ row, col }),
      this.northwest({ row, col }),
      this.northeast({ row, col }),
      this.southwest({ row, col }),
      this.southeast({ row, col }),
    ];

    for (const n of dirs) {
      if (n !== undefined) list.push(n);
    }

    return list;
  }

  neighbourValues({ row, col }) {
    return this.neighbours({ row, col }).map((n) => n.value);
  }

  rows() {
    return this.#rows;
  }

  cols() {
    return this.#cols;
  }

  size() {
    return this.#rows * this.#cols;
  }


  fill(value) {
    this.#arr.fill(value);
  }

  
  #makeCell(row, col) {
    return { row, col, value: this.get({ row, col }) };
  }
}

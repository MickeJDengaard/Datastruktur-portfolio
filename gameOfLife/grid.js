export default class Grid {
  #matrix;

  constructor(rows, cols) {
    this.#matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  set({ row, col }, value) {
    if (this.isValid({ row, col })) {
      this.#matrix[row][col] = value;
    }
  }

  get({ row, col }) {
    return this.#matrix[row][col];
  }

  neighbours({ row, col }) {
    const directions = [
      [-1, 0], [-1, -1], [-1, 1],
      [1, 0], [1, -1], [1, 1],
      [0, -1], [0, 1]
    ];

    return directions
      .map(([dr, dc]) => {
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < this.#matrix.length && c >= 0 && c < this.#matrix[0].length) {
          return { row: r, col: c, value: this.#matrix[r][c] };
        }
        return null;
      })
      .filter(Boolean);
  }

  neighbourValues(pos) {
    return this.neighbours(pos).map(n => n.value);
  }

  rows() { return this.#matrix.length; }
  cols() { return this.#matrix[0].length; }

  updateGrid(newMatrix) {
    this.#matrix = newMatrix;
  }

  isValid({ row, col }) {
    return row >= 0 && row < this.#matrix.length && col >= 0 && col < this.#matrix[0].length;
  }
}

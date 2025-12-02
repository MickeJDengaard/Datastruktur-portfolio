import Grid from "./grid.js";

export class GridModel {
  #grid;

  constructor(rows, cols) {
    this.#grid = new Grid(rows, cols);
    this._rows = rows;
    this._cols = cols;
  }

  rows() { return this._rows; }
  cols() { return this._cols; }

  get({ row, col }) { return this.#grid.get({ row, col }); }
  set({ row, col }, value) { this.#grid.set({ row, col }, value); }

  toggleCell(row, col) {
    const current = this.get({ row, col });
    this.set({ row, col }, current ? 0 : 1);
  }

  randomize() {
    for (let r = 0; r < this._rows; r++) {
      for (let c = 0; c < this._cols; c++) {
        this.set({ row: r, col: c }, Math.random() < 0.5 ? 1 : 0);
      }
    }
  }

  nextGeneration() {
    const newGen = Array.from({ length: this._rows }, () => Array(this._cols).fill(0));

    for (let r = 0; r < this._rows; r++) {
      for (let c = 0; c < this._cols; c++) {
        const alive = this.get({ row: r, col: c });
        const neighbours = this.#grid.neighbourValues({ row: r, col: c });
        const aliveCount = neighbours.filter(n => n === 1).length;

        if (alive) {
          newGen[r][c] = aliveCount === 2 || aliveCount === 3 ? 1 : 0;
        } else if (aliveCount === 3) {
          newGen[r][c] = 1;
        }
      }
    }

    this.#grid.updateGrid(newGen);
  }
}

let gridInstance = null;

export function createGridModel(rows, cols) {
  gridInstance = new GridModel(rows, cols);
  return gridInstance;
}

export function getGridInstance() { return gridInstance; }

export function readCell(row, col) { return gridInstance ? gridInstance.get({ row, col }) : 0; }

export function writeCell({ row, col }, value) { gridInstance?.set({ row, col }, value); }

export function randomizeGrid() { gridInstance?.randomize(); }

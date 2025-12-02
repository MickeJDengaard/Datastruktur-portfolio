import * as model from "./model.js";
import * as view from "./view.js";

function initializeApp() {
  view.setupGridUI();
}

export function initGrid(rows, cols) {
  return model.createGridModel(rows, cols);
}

export function fetchGrid() {
  return model.getGridInstance();
}

export function flipCellState(row, col) {
  const currentState = model.readCell(row, col);
  model.writeCell({ row, col }, currentState ? 0 : 1);
}

export function randomFill() {
  model.randomizeGrid();
}

initializeApp();

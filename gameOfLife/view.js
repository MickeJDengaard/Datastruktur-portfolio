import * as controller from "./controller.js";

let intervalId = null;
let generationCount = 0;

export function setupGridUI() {
  const gridContainer = document.getElementById("grid");
  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("cols");
  const generateBtn = document.getElementById("generate");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const randBtn = document.getElementById("rand");

  generateBtn.addEventListener("click", () => {
    const rows = parseInt(rowsInput.value, 10);
    const cols = parseInt(colsInput.value, 10);
    controller.initGrid(rows, cols);

    gridContainer.innerHTML = "";
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 20px)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.addEventListener("click", () => {
          controller.flipCellState(r, c);
          renderGrid();
        });
        gridContainer.appendChild(cell);
      }
    }
    renderGrid();
  });

  startBtn.addEventListener("click", startSimulation);
  stopBtn.addEventListener("click", stopSimulation);
  randBtn.addEventListener("click", randomizeGrid);
}

function renderGrid() {
  const cells = document.querySelectorAll(".cell");
  const modelGrid = controller.fetchGrid();

  cells.forEach((cell, idx) => {
    const row = Math.floor(idx / modelGrid.cols());
    const col = idx % modelGrid.cols();
    modelGrid.get({ row, col }) ? cell.classList.add("alive") : cell.classList.remove("alive");
  });
}

function startSimulation() {
  const model = controller.fetchGrid();
  if (!model) return;

  intervalId = setInterval(() => {
    generationCount++;
    model.nextGeneration();
    renderGrid();
    updateGenerationDisplay();
  }, 500);
}

export function stopSimulation() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    generationCount = 0;
    updateGenerationDisplay();
  }
}

function updateGenerationDisplay() {
  document.getElementById("genText").textContent = generationCount;
}

function randomizeGrid() {
  controller.randomFill();
  renderGrid();
}

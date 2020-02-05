function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols
let rows
let resolution = 8

function setup() {
  createCanvas(1400, 600)
  // to dynamicly expose squares
  cols = width / resolution;
  rows = height / resolution;
  // make 2d array structure that empty
  // itirate through each column and row and fill with a random binary number
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * Math.floor(2));
    }
  }
}


function draw() {
  background(0)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 3, resolution - 3);
      }
    }
  }

  let next = make2DArray(cols, rows)
  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j]
      // Edges
        // Count live neighbors
        let sum = 0
        let neighbors = countNeighbors(grid, i, j)
        // If my state is zero and three of my neighbors are alive my state is 1
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }

    }
  }
  grid = next
}

function countNeighbors(grid, x, y) {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum
}


var p = document.getElementById("reset");
 p.onclick = showAlert;
 function showAlert(event) {
location.reload()
 }

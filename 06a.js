// https://adventofcode.com/2018/day/6

const fs = require('fs');
let start = (new Date).getTime();
let rows = fs.readFileSync('06input.txt', 'utf8').split('\n');
const _size = 500;
const _largeSize = 600;

// parse points
let points = rows.map(p => {
  let c = p.split(', ');
  return { x: parseInt(c[0]), y: parseInt(c[1]), smallSurface: 0, largeSurface: 0 };
});
//console.log(points);

// create grid
let grid = new Array(_size);
for (let i = 0; i < _size; i++) {
  grid[i] = new Array(_size).fill(null);
}
// find closest points in small grid
for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid.length; y++) {
    let n = findClosestPoint(points, x, y);
    let index = n.index > -1 ? n.index : null;
    grid[x][y] = index;
    if (index !== null) {
      //console.log(`coordinate: [${x}, ${y}] point: [${points[index].x}, ${points[index].y}] distance: ${n.value}`);
      points[index].smallSurface += 1;
    }
  }
}
//console.log(grid);

// create large grid
let largeGrid = new Array(_largeSize);
for (let x = 0; x < _largeSize; x++) {
  largeGrid[x] = new Array(_largeSize).fill(null);
}
// find closest points in large grid
for (let x = 0; x < largeGrid.length; x++) {
  for (let y = 0; y < largeGrid.length; y++) {
    let n = findClosestPoint(points, x, y);
    let index = n.index > -1 ? n.index : null;
    largeGrid[x][y] = index;
    if (index !== null) {
      points[index].largeSurface += 1;
    }
  }
}

for (let i = 0; i < points.length; i++) {
  let surface = 0;
  let index = 0;
  if (points[i].smallSurface > surface && 
    points[i].smallSurface === points[i].largeSurface) {
      console.log(`point ${i}: ${points[i].smallSurface} ${points[i].largeSurface}`);
      surface = points[i].smallSurface
      index = i;
    }
}


console.log(`done in ${(new Date).getTime() - start}ms.`);

function findClosestPoint(points, x, y) {
  let index = -1;
  let value = _size;
  let value2 = _size;
  for (let i = 0; i < points.length; i++) {
    let d = distance(points[i].x, points[i].y, x, y);
    if (d < value) {
      value = d;
      index = i;
    }
    else if (d === value) {
      value2 = d;
    }
    //console.log(`testing point ${i} [${points[i].x},${points[i].y}] distance to [${x},${y}] distance: ${d} smallest distance: ${value}`);
  }
  let closest = value===value2 ? { index: -1, value } : { index, value };
  //console.log(`closest point ${index} [${points[index].x},${points[index].y}] distance to [${x},${y}] value: ${closest.value}`);
  return closest;
}

function distance(x1, y1, x2, y2) {
  let x, y;
  if (x1 === x2 && y1 === y2) {
    return 0;
  } else {
    x = x1 - x2;
    if (x < 0) x = x * (-1);
    y = y1 - y2;
    if (y < 0) y = y * (-1);
  }
  return x + y;
}
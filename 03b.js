// https://adventofcode.com/2018/day/3

const fs = require('fs');

let start = (new Date).getTime();
let rows = fs.readFileSync('03input.txt', 'utf8').split('\n');

const size = 1001;
let canvas = [];
for (let i = 0; i < size; i++) {
  canvas[i] = new Array(size);
}

let shapes = [];
for (let row of rows) {
  //console.log(`row ${row}`);
  row = row.replace('@ ','').replace(': ',' ').split(' ');
  let coordinates = row[1].split(',').map(c => parseInt(c));
  let dimensions = row[2].split('x').map(c => parseInt(c));
  let shape = {
    claim: row[0],
    x1: coordinates[0],
    x2: coordinates[0] + dimensions[0],
    y1: coordinates[1],
    y2: coordinates[1] + dimensions[1],
    width: dimensions[0],
    height: dimensions[1],
  };
  //console.log(shape);
  shapes.push(shape);
  draw(shape, canvas);
}

for (let i = 0; i < shapes.length; i++) {
  let overlapCounter = 0;
  for (let j = 0; j < shapes.length; j++) {
    if (i === j) continue;
    let overlap = hasOverlap(shapes[i], shapes[j]);
    if (overlap) {
      overlapCounter++;
    }
  }
  if (overlapCounter === 0) {
    console.log(shapes[i]);
    break;
  }
}

console.log(`done in ${(new Date).getTime() - start}ms.`);

function draw(shape, canvas) {
  for (let x = shape.x1; x < shape.x2; x++) {
    for (let y = shape.y1; y < shape.y2; y++) {
      if (canvas[x][y] === undefined) {
        canvas[x][y] = 1;
      }
      else {
        canvas[x][y] += 1;
      }
    }
  }
}

function hasOverlap(shape1, shape2) {
  if (shape1.x1 < shape2.x2 && shape1.x2 > shape2.x1 &&
      shape1.y1 < shape2.y2 && shape1.y2 > shape2.y1) {
    return true;
  }
  return false;
}
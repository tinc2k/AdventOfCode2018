// https://adventofcode.com/2018/day/3

const fs = require('fs');

let start = (new Date).getTime();
let rows = fs.readFileSync('03input.txt', 'utf8').split('\n');
//let rows = fs.readFileSync('03input2.txt', 'utf8').split('\n');

const size = 1001; // 8
let canvas = [];
for (let i = 0; i < size; i++) {
  canvas[i] = new Array(size);
}

let shapes = [];
for (let row of rows) {
  //TODO regex?
  //console.log(`row ${row}`);
  row = row.replace('@ ','');
  row = row.replace(': ',' ');
  row = row.split(' ');
  let claim = parseInt(row[0].replace('#',''));
  let coordinates = row[1].split(',').map(c => parseInt(c));
  let dimensions = row[2].split('x').map(c => parseInt(c));
  let shape = {
    claim,
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

let counter = 0;
for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    if (canvas[x][y] !== undefined &&
        canvas[x][y] > 1) {
      counter++;
    }
  }
}

console.log(counter);
console.log(`done in ${(new Date).getTime() - start}ms.`);

function draw(shape, canvas) {
  for (let x = shape.x1; x < shape.x2; x++) {
    for (let y = shape.y1; y < shape.y2; y++) {
      if (canvas[x][y] === undefined)
        canvas[x][y] = 1;
      else
        canvas[x][y] += 1;
    }
  }
}
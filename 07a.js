// https://adventofcode.com/2018/day/7

const fs = require('fs');
let start = (new Date).getTime();
let rows = fs.readFileSync('07input.txt', 'utf8').split('\n');

const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let nodes = {};
//console.log(nodes);

for (let row of rows) {
  //console.log(row);
  let dependency = row.slice(5,6);
  let node = row.slice(36,37);
  if (!nodes[node]) {
    nodes[node] = { dependencies: [], completed: false };
  }
  if (!nodes[dependency]) {
    nodes[dependency] = { dependencies: [], completed: false };
  }
  nodes[node].dependencies.push(dependency);
}
//console.log(nodes);

let doneSteps = process(nodes, []);
console.log(doneSteps.join(''));

console.log(`done in ${(new Date).getTime() - start}ms.`);

function process(nodes, sequence) {
  let runnables = [];
  for (let node in nodes) {
    if (isRunnable(nodes, node)) {
      runnables.push(node);
    }
  }
  // sort runnable steps
  runnables = runnables.sort((a,b) => {
    return a >= b ? 1 : -1;
  });
  // execute first runnable node
  nodes[runnables[0]].completed = true;
  sequence.push(runnables[0]);
  console.log('new runnables are:', runnables);
  // append to doneSteps, remove from awaitingSteps
  if (!isDone(nodes)) {
    //console.log(nodes);
    return process(nodes, sequence);
  } else {
    return sequence;
  }
}

function isDone(nodes) {
  let done = true;
  for (let char of alpha) {
    if (nodes[char] && nodes[char].completed === false) {
      done = false;
      break;
    }
  }
  return done;
}

function isRunnable(nodes, char) {
  if (nodes[char].completed === true) {
    return false;
  }
  if (nodes[char].dependencies.length === 0) {
    return true;
  }
  let runnable = true;
  for (let d of nodes[char].dependencies) {
    if (nodes[d].completed === false) {
      runnable = false;
      break;
    }
  }
  return runnable;
}




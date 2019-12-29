// https://adventofcode.com/2018/day/7

const fs = require('fs');
let start = (new Date).getTime();
let rows = fs.readFileSync('07input2.txt', 'utf8').split('\n');

const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let nodes = new Map();
const capacity = 2;
//console.log(nodes);

for (let row of rows) {
  //console.log(row);
  let dependency = row.slice(5,6);
  let node = row.slice(36,37);

  if (!nodes[node]) {
    nodes[node] = {
      dependencies: [],
      completed: false,
      running: false,
      time: node.charCodeAt(0) - 64
      //time: node.charCodeAt(0) - 4
    };
  }
  if (!nodes[dependency]) {
    nodes[dependency] = {
      dependencies: [],
      completed: false,
      running: false,
      time: dependency.charCodeAt(0) - 64
      //time: dependency.charCodeAt(0) - 4
    };
  }
  nodes[node].dependencies.push(dependency);
}
console.log(nodes);

let results = process(nodes);
console.log(results);

console.log(`done in ${(new Date).getTime() - start}ms.`);

function process(nodes, running = {}, sequence = [], totalTime = 0) {
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
  //console.log('runnables', runnables);
  runnables = runnables.splice(0, capacity);
  console.log('runnables', runnables);
  // execute runnable nodes in capacity
  for (let node of runnables) {
    nodes[node].running = true;
    nodes[node].time -= 1;
    if (nodes[node].time === 0) {
      nodes[node].running = false;
      nodes[node].completed = true;
    }
    totalTime += 1;
  }
  // append to doneSteps, remove from awaitingSteps
  if (!isDone(nodes)) {
    //console.log(nodes);
    return process(nodes, running, sequence, totalTime);
  } else {
    sequence = sequence.join('');
    return { sequence, totalTime };
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




// https://adventofcode.com/2018/day/7

const fs = require('fs');
let start = (new Date).getTime();
let rows = fs.readFileSync('07input2.txt', 'utf8').split('\n');

const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let nodes = new Map();

for (let row of rows) {
  let dependency = row.slice(5,6);
  let node = row.slice(36,37);
  if (nodes.has(node)) {
    let dependencies = nodes.get(node).dependencies;
    dependencies.push(dependency);
  } else {
    nodes.set(node, { dependencies: [dependency] });
  }
  if (!nodes.has(dependency)) {
    nodes.set(dependency, { dependencies: [] });
  }
}

console.log(nodes);
let results = process(nodes);
console.log(results);
console.log(`done in ${(new Date).getTime() - start}ms.`);

function process(left, done = new Map()) {
  for (let node of left.keys()) {
    console.log(node);
  }
  // for (let node in nodes) {
  //   if (isRunnable(nodes, node)) {
  //     runnables.push(node);
  //   }
  // }
  // sort runnable steps
  // runnables = runnables.sort((a,b) => {
  //   return a >= b ? 1 : -1;
  // });
  // execute first runnable node
  // nodes[runnables[0]].completed = true;
  // sequence.push(runnables[0]);
  //console.log('new runnables are:', runnables);
  // append to doneSteps, remove from awaitingSteps
  if (left.keys.length > 0) {
    //console.log(nodes);
    //return process(left, done);
  } else {
    return done.keys();
  }
}

function isRunnable(left, node) {
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




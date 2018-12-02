const fs = require('fs');

let start = (new Date).getTime();

let frequency = 0;
let pastFrequencies = {};
let changes = fs.readFileSync('01input.txt', 'utf8').split('\n').map(r => parseInt(r));

let isRepeating = false;
while (!isRepeating) {
  for (let change of changes) {
    frequency += change;
    isRepeating = pastFrequencies[`${frequency}`];
    if (isRepeating) {
      console.log('repeating frequency:', frequency);
      console.log(`done in ${(new Date).getTime() - start}ms.`);
      break;
    }
    pastFrequencies[`${frequency}`] = true;
  }
}
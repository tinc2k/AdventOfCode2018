const fs = require('fs');

let start = (new Date).getTime();

let frequency = 0;
let pastFrequencies = [];
let changes = fs.readFileSync('01input.txt', 'utf8').split('\n');

let isRepeating = false;
while (!isRepeating) {
  for (let i = 0; i < changes.length; i++) {
    let change = parseInt(changes[i]);
    frequency += change;
    isRepeating = pastFrequencies.find(f => f === frequency);
    if (isRepeating) {
      console.log('repeating frequency:', frequency);
      console.log(`done in ${(new Date).getTime() - start}ms.`);
      break;
    }
    pastFrequencies.push(frequency);
  }
}
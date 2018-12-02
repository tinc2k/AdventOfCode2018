const fs = require('fs');

let start = (new Date).getTime();
let productIds = fs.readFileSync('02input.txt', 'utf8').split('\n');

let breaker;
for (let first of productIds) {
  for (let second of productIds) {
    let result = diff(first, second);
    if (result === 1) {
      console.log({ first, second });
      breaker = true;
      break;
    }
  }
  if (breaker) break;
}
console.log(`done in ${(new Date).getTime() - start}ms.`);

function diff(first, second) {
  let d = 0;
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) {
      d += 1;
      if (d > 1) break;
    }
  }
  return d;
}

const fs = require('fs');

let start = (new Date).getTime();

let productIds = fs.readFileSync('02input.txt', 'utf8').split('\n');

let totalTwos = 0;
let totalThrees = 0;
for (let productId of productIds) {
  let repeats = calculateRepeats(productId);
  let analysis = analyzeRepeats(repeats);
  totalTwos += analysis[0];
  totalThrees += analysis[1];
}
console.log({ totalTwos, totalThrees, checksum: totalTwos*totalThrees });
console.log(`done in ${(new Date).getTime() - start}ms.`);

function calculateRepeats(productId) {
  let repeats = {};
  for (let letter of productId) {
    if (repeats[letter] === undefined) {
      repeats[letter] = 1;
    } else {
      repeats[letter] += 1;
    }
  }
  return repeats;
}

function analyzeRepeats(repeats) {
  let hasTwoOfAnyLetter = 0;
  let hasThreeOfAnyLetter = 0;
  let keys = Object.keys(repeats);
  for (let key of keys) {
    if (repeats[key] === 2) {
      hasTwoOfAnyLetter = 1;
    }
    else if (repeats[key] === 3) {
      hasThreeOfAnyLetter = 1;
    }
    if (hasTwoOfAnyLetter && hasThreeOfAnyLetter) {
      break;
    }
  }
  return [ hasTwoOfAnyLetter, hasThreeOfAnyLetter ];
}
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
  let repeats = new Map();
  for (let letter of productId) {
    let n = repeats.get(letter);
    repeats.set(letter, n ? n + 1 : 1);
  }
  return repeats;
}

function analyzeRepeats(repeats) {
  let hasTwoOfAnyLetter = false;
  let hasThreeOfAnyLetter = false;
  for (let key of repeats.keys()) {
    if (repeats.get(key) === 2) {
      hasTwoOfAnyLetter = true;
    }
    else if (repeats.get(key) === 3) {
      hasThreeOfAnyLetter = true;
    }
    if (hasTwoOfAnyLetter && hasThreeOfAnyLetter) {
      break;
    }
  }
  return [ hasTwoOfAnyLetter, hasThreeOfAnyLetter ];
}
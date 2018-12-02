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
  let repeats = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 };
  for (let letter of productId) {
    repeats[letter] += 1;
  }
  return repeats;
}

function analyzeRepeats(repeats) {
  let hasTwoOfAnyLetter = false;
  let hasThreeOfAnyLetter = false;
  for (let key in repeats) {
    if (!hasTwoOfAnyLetter && repeats[key] === 2) {
      hasTwoOfAnyLetter = true;
    }
    else if (!hasThreeOfAnyLetter && repeats[key] === 3) {
      hasThreeOfAnyLetter = true;
    }
    if (hasTwoOfAnyLetter && hasThreeOfAnyLetter) {
      break;
    }
  }
  return [ hasTwoOfAnyLetter, hasThreeOfAnyLetter ];
}
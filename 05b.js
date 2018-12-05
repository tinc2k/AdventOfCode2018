// https://adventofcode.com/2018/day/5

const fs = require('fs');

let start = (new Date).getTime();
let polymer = fs.readFileSync('05input.txt', 'utf8');

function add(polymer, unit) {
  if (polymer.length === 0) {
    polymer.push(unit);
    return;
  }
  let lastUnit = polymer[polymer.length - 1];
  if (unit.toLowerCase() !== unit && unit.toLowerCase() === lastUnit ||
      unit.toUpperCase() !== unit && unit.toUpperCase() === lastUnit) {
        polymer.pop();
  } else {
    polymer.push(unit);
  }
}

function react(polymer) {
  let newPolymer = [];
  for (let i = 0; i < polymer.length; i++) {
    add(newPolymer, polymer[i]);
  }
  return newPolymer;
}

let lower = 'abcdefghijklmnopqrstuvwxyz';
let smallestLetter = null;
let smallest = 50000;
for (let i = 0; i < lower.length; i++) {
  //console.log('letter', lower[i], lower[i].toUpperCase());
  //let smaller = polymer.replace(lower[i], '').replace(lower[i].toUpperCase(), '');
  let smaller = polymer.split(lower[i]).join('').split(lower[i].toUpperCase()).join(''); // lol
  let reacted = react(smaller);
  if (reacted.length < smallest) {
    smallest = reacted.length;
    smallestLetter = lower[i];
  }
}

console.log(smallest, smallestLetter);
console.log(`done in ${(new Date).getTime() - start}ms.`);


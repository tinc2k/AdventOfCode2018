// https://adventofcode.com/2018/day/5
const fs = require('fs');
let start = (new Date).getTime();
let polymer = fs.readFileSync('05input.txt', 'utf8');
let alpha = 'abcdefghijklmnopqrstuvwxyz';
let letter = null;
let shortest = polymer.length;

console.time();
for (let i = 0; i < alpha.length; i++) {
  let shorter = remove(polymer, alpha[i]);
  let reacted = react(shorter);
  if (reacted.length < shortest) {
    shortest = reacted.length;
    letter = alpha[i];
  }
}
console.log(shortest, letter);
console.timeEnd();

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
function remove(polymer, unit) {
  return polymer.split(unit).join('').split(unit.toUpperCase()).join('');
}
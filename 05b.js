// https://adventofcode.com/2018/day/5

const fs = require('fs');

let start = (new Date).getTime();
let polymer = fs.readFileSync('05input.txt', 'utf8');
let lower = 'abcdefghijklmnopqrstuvwxyz';

let letter = null;
let shortest = polymer.length;
for (let i = 0; i < shortest.length; i++) {
  let shorter = remove(polymer, lower[i]);
  let reacted = react(shorter);
  if (reacted.length < length) {
    length = reacted.length;
    letter = shortest[i];
  }
}

console.log({letter, length});
console.log(`done in ${(new Date).getTime() - start}ms.`);

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
  // let newPolymer = [];
  // for (let i = 0; i < polymer.length; i++) {
  //   if (polymer[i] !== unit.toLowerCase() && polymer[i] !== unit.toUpperCase()) {
  //     newPolymer.push(polymer[i]);
  //   }
  // }
  // return newPolymer.join('');
}
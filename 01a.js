const fs = require('fs');

// let data = await fetch('https://adventofcode.com/2018/day/1/input').then(data => {...
// nope: https://www.reddit.com/r/adventofcode/comments/3v64sb/aoc_is_fragile_please_be_gentle/

let start = (new Date).getTime();

let frequency = 0;
let changes = fs.readFileSync('01input.txt', 'utf8').split('\n');
changes.forEach(n => frequency += parseInt(n));
console.log(frequency);
console.log(`done in ${(new Date).getTime() - start}ms.`);
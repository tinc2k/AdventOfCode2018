# Advent of Code 2018

Half-assed attempt at [2018 Advent of Code](https://adventofcode.com/2018).

Will try to update with improvements and summarize what I've learned each day.

## 01a
- originally wanted to set up to pull data on each run using [node-fetch](https://github.com/bitinn/node-fetch), but learned that's dumb because input doesn't change & we probably shouldn't unnecessarily [bomb the server](https://www.reddit.com/r/adventofcode/comments/3v64sb/aoc_is_fragile_please_be_gentle/) with requests
- don't think runtime can be greatly improved from first draft, as we're doing one pass over array (~6ms)

## 01b
- first run was quite inefficient (~10s on my laptop w/ i7-4558U) due to using array to store a list of frequencies, and doing linear search on each iteration to look for duplicates
- first rewrite used JavaScript prototype's ability to add arbitrary attributes (~85ms)
- second rewrite used native Set type for additional performance gain (~35ms)

## 02a
- readable but likely too verbose (~16ms)
- tried rewrite calculateRepeats() using native Map type for tiny performance improvement (~10ms)
- another performance improvement using object literals to avoid checking for first match (~6ms)

## 02b
- first run crappy/inefficient - O(n^2)? (~48ms)
- added limiters on first discovery & diff >1 (~12ms)

## 03a
- algo didn't calculate correctly on first two runs: i was off-by-one on shape-drawing loops
- parsing was PITA, should figure out if there are parsing filters/masks I can use in JavaScript
- TODO figure out better string parsing method

## 03b
- TODO bonus: print out canvas

## 04a
- first solution an absolute shit show in terms of readability
- new trick: use `new Array(length).fill(value)` to initialize values
- TODO figure out if we can remove `moment` and use native Dates

## 04b

## 05a
- strings are immutable, duh
- obvious from example we should avoid multiple passes through polymer

## 05b
- attempted rewriting remove() to *not* use the nasty string.split().join() thing to remove all occurences of particular character, rewrite sucked because it involved more array operations

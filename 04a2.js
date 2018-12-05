// https://adventofcode.com/2018/day/4

const fs = require('fs');
const moment = require('moment');

let start = (new Date).getTime();
let rows = fs.readFileSync('04input.txt', 'utf8').split('\n');
let logs = rows.map(row => {
  return {
    time: moment.utc(row.slice(1,17)),
    event: row.slice(19, row.length)
  };
}).sort((a,b) => a.time >= b.time ? 1 : -1);

let calendar = generateCalendar(logs);
let guardId = findGuardMostOftenAsleep(calendar);
let minute = findMinuteMostOftenAsleep(calendar[guardId]).index;
console.log({ guardId, minute });
console.log(`done in ${(new Date).getTime() - start}ms.`);

function generateCalendar(logs) {
  let calendar = {};
  let guardId;
  for (let i = 0; i < logs.length - 1; i++) {
    let log = logs[i];
    let nextLog = logs[i + 1];
    //console.log(`${log.time.toISOString()} ${log.event}`);
    if (log.event[0] === 'G') {
      guardId = log.event.split('#')[1].split(' ')[0];
      if (!calendar[guardId]) {
        calendar[guardId] = new Array(60).fill(0);
      }
    } else if (log.event[0] === 'f') {
      let asleep = moment.utc(log.time);
      let awake = moment.utc(nextLog.time);
      for (let i = asleep.minutes(); i < awake.minutes(); i++) {
        calendar[guardId][i] += 1;
      }
    }
  }
  return calendar;
}

function findGuardMostOftenAsleep(calendar) {
  let minutesAsleep = 0;
  let guardId = null;
  for (let id in calendar) {
    let minutes = sumMinutes(calendar[id]);
    if (minutes > minutesAsleep) {
      minutesAsleep = minutes;
      guardId = id;
    }
  }
  return guardId;
}

function sumMinutes(minutes) {
  let sum = 0;
  minutes.forEach(m => sum += m);
  return sum;
}

function findMinuteMostOftenAsleep(minutes) {
  let amount = 0;
  let index = 0;
  for (let i = 0; i < minutes.length; i++) {
    if (minutes[i] > amount) {
      amount = minutes[i];
      index = i;
    }
  }
  return { index, amount };
}

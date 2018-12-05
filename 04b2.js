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
console.log(findGuardMostAsleep(calendar));
console.log(`done in ${(new Date).getTime() - start}ms.`);

function generateCalendar(logs) {
  let calendar = {};
  let guardId;
  for (let i = 0; i < logs.length; i++) {
    let log = logs[i];
    let nextLog = logs[i + 1]; // lol
    //console.log(`${log.time.toISOString()} ${log.event}`);
    if (log.event[0] === 'G') {
      guardId = log.event.split('#')[1].split(' ')[0];
      if (!calendar[guardId]) {
        calendar[guardId] = [];
      }
    } else if (log.event[0] === 'f') {
      let asleep = moment.utc(log.time);
      let awake = moment.utc(nextLog.time);
      for (let i = asleep.minutes(); i < awake.minutes(); i++) {
        if (calendar[guardId][i]) {
          calendar[guardId][i] += 1;
        } else {
          calendar[guardId][i] = 1;
        }
      }
    }
  }
  return calendar;
}

function findGuardMostAsleep(calendar) {
  let amount = 0;
  let index = null;
  let guardId = null
  for (let id in calendar) {
    let minute = findMinuteMostOftenAsleep(calendar[id]);
    if (minute.amount > amount) {
      index = minute.index;
      amount = minute.amount;
      guardId = id;
    }
  }
  return { guardId, minute: index };
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

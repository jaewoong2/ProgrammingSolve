const fs = require('fs')
const input = fs.readFileSync('./3190[뱀]/index.txt').toString().split('\n')

const N = +input[0]
const K = +input[1]
const arr = []

for (let i = 0; i < K; i++) {
  arr.push(input[i + 2].split(" ").map(v => +v))
}

const apples = {}

for (let [row, col] of arr) {
  const key = JSON.stringify([row - 1, col - 1])
  apples[key] = true
}
const L = input[K + 2]
const commands = []
for (let i = 0; i < L; i++) {
  commands.push(input[K + 3 + i].split(" "))
}
const times = {}

for (let [time, r] of commands) {
  times[time] = r
}


// 동, 남, 서, 북 (1 증가 90 도 회전)
const directs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

const rotate = (direct, step) => {
  if (direct + step === 4) return 0
  if (direct + step === -1) return 3
  return direct + step
}


const queue = [[0, 0, 1, 0, 1, [JSON.stringify([0, 0])]]]

while (queue.length > 0) {
  const [row, col, length, direct, time, snake] = queue.shift()
  const [drow, dcol] = directs[direct]
  const [nrow, ncol] = [row + drow, col + dcol]

  if (snake.includes(JSON.stringify([nrow, ncol]))) {
    console.log(time)
    break
  }
  
  if (0 <= nrow && nrow < N && 0 <= ncol && ncol < N) {
    if (JSON.stringify([nrow, ncol]) in apples && apples[JSON.stringify([nrow, ncol])]) {
      apples[JSON.stringify([nrow, ncol])] = false
      if (`${time}` in times) {
        if (times[time] === "D") {
          const newDirect = rotate(direct, 1)
          queue.push([nrow, ncol, length + 1, newDirect, time + 1, [...snake, JSON.stringify([nrow, ncol])]])
        } else {
          const newDirect = rotate(direct, -1)
          queue.push([nrow, ncol, length + 1, newDirect, time + 1, [...snake, JSON.stringify([nrow, ncol])]])
        }
      } else {
        queue.push([nrow, ncol, length + 1, direct, time + 1, [...snake, JSON.stringify([nrow, ncol])]])
      }
    } else {
      if (`${time}` in times) {
        if (times[time] === "D") {
          const newDirect = rotate(direct, 1)
          queue.push([nrow, ncol, length, newDirect, time + 1, [...snake.splice(1), JSON.stringify([nrow, ncol])]])
        } else {
          const newDirect = rotate(direct, -1)
          queue.push([nrow, ncol, length, newDirect, time + 1, [...snake.splice(1), JSON.stringify([nrow, ncol])]])
        }
      } else {
        queue.push([nrow, ncol, length, direct, time + 1, [...snake.splice(1), JSON.stringify([nrow, ncol])]])
      }
    }
  } else {
    console.log(time)
    // 종료
  }
}

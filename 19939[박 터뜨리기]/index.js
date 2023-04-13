const fs = require('fs')
const input = fs.readFileSync('./19939[박 터뜨리기]/index.txt').toString().split('\n')
let [N, M] = input[0].split(" ").map(v => +v)
const arr = new Array(M).fill(0).map(() => 1)
N -= M
if (N <= 0) {
  console.log(-1)
} else {
  let temp = N
  let max = 1
  let min = 1
  
  while (temp >= (max + 1 - min)) {
    arr.shift()
    arr.push(max + 1)
    temp -= (max + 1 - min)
    max = arr[M - 1]
    min = arr[0]
  }

  while (temp > 0) {
    for (let i = M - 1; i >= 0; i--) {
      if (temp > 0) {
        arr[i] += 1
        temp -= 1 
      }
    }
  }
  
  if (new Set(arr).size === arr.length) {
    console.log(Math.max(...arr) - Math.min(...arr))
  } else {
    console.log(-1)
  }
}

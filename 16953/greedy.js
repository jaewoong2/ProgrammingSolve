const fs = require('fs')
const input = fs.readFileSync('./16953/index.txt').toString().split('\n')[0]

let [a, b] = input.split(' ').map(v => +v)

let flag = false
let count = 0
while (b > a) {
  let strB = `${b}`
  if (b % 2 === 0) {
    b = Math.floor(b / 2)
    count += 1
  } else if (strB[strB.length - 1] === "1") {
    b = Math.floor(b / 10)
    count += 1
  } else {
    flag = true
    break    
  }
}

if (flag) {
  console.log(-1)
} else {
  if (b === a) {
    console.log(count + 1)
  } else {
    console.log(-1)
  }
}
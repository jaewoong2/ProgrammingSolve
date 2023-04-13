const fs = require('fs')
const input = fs.readFileSync('./11047/index.txt').toString().split('\n')
// const input = fs.readFileSync('/dev/stdin').toString().split('\n')
let [n, m] = input[0].split(' ').map(v => +v)
const array = []

for (let i = 1; i < input.length; i++) {
  array.push(+input[i])
}

let count = 0
for (let i = array.length - 1; i >= 0; i--) {
  count += parseInt(m / array[i])
  m = m % array[i]
}

console.log(count)
const fs = require('fs')
const input = fs.readFileSync('./11399/index.txt').toString().split('\n')
const n = +input[0]
const arr = input[1].split(' ').map(value => +value)
arr.sort((a, b) => a - b)

let pivot = arr[0]
for (let i = 1; i < arr.length; i++) {
  arr[i] = pivot + arr[i]
  pivot = arr[i]
}

console.log(arr.reduce((acc, curr) => acc + curr))

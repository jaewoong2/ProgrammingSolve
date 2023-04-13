const fs = require('fs')
let S = +fs.readFileSync('./1789/index.txt').toString().split('\n')[0]

let arr = new Array(S).fill(0).map((_, i) => i + 1)

let pivot = arr[0]

for (let i = 1; i < arr.length; i++) {
  arr[i] = pivot + arr[i]
  pivot = arr[i]
  if (pivot >= S) {
    console.log(i)
    break
  }
}
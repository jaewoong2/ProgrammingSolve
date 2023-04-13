const fs = require('fs')
let input = fs.readFileSync('./1541/index.txt').toString().split('\n')[0]
// const input = fs.readFileSync('/dev/stdin').toString().split('\n')
input = input.split('-')

input = input.map(value => {
  return value.split('+').map(v => +v).reduce((acc, curr) => acc + curr)
})

let pivot = input[0]

for (let i = 1; i < input.length; i++) {
  pivot = pivot - input[i]  
}

console.log(pivot)
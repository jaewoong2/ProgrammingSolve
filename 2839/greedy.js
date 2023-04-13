const fs = require('fs')
let input = +fs.readFileSync('./2839/index.txt').toString().split('\n')[0]

let count = 0

while(input > 0) {

  if (input === 0 || input % 5 === 0) {
    count += Math.floor(input / 5) 
    break
  }

  input -= 3
  count += 1
}

console.log(count)
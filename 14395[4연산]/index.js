const fs = require('fs')
const input = fs.readFileSync('./14395[4연산]/index.txt').toString().split("\n")
const [N, M] = input[0].split(" ").map(v => +v)
const queue = [[N, ""]]
const visited = {}

if (N === M) {
  console.log(0)
} else {
  let flag = false
  while (queue.length > 0) {
    const [current, select] = queue.shift()
    
    if (current in visited) continue
    visited[current] = true
  
    if (current === M) {
      flag = true
      console.log(select)
      break
    }
  
    for (let oper of ['*', '+', '-', '/']) {
      if (oper === '+') {
        queue.push([current + current, select + oper])
      }
  
      if (oper === '*') {
        queue.push([current * current, select + oper])
      }
  
      if (oper === "/") {
        if (current === 0) continue
        queue.push([current / current, select + oper])
      }
  
      if (oper === '-') {
        queue.push([current - current, select + oper])
      }
    }
  }
  
  if (!flag) {
    console.log(-1)
  }
}

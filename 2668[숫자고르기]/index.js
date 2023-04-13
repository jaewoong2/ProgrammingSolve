const fs = require('fs')
const input = fs.readFileSync('./2668[숫자고르기]/index.txt').toString().split('\n')

const N = +input[0]
const board = [0, ...input.splice(1).map(v => +v)]

const map = new Array(N + 1).fill(0).map(() => -1)
const visited = new Array(N + 1).fill(0).map(() => -1)
const finished = new Array(N + 1).fill(0).map(() => false)

function dfs(currentNode) {
  const nextNode = board[currentNode]
  
  if (visited[nextNode] === -1) {
    count += 1
    map[count] = nextNode
    visited[nextNode] = count
    dfs(nextNode)
  } else {
    if (!finished[nextNode]) {
      cycle = [visited[nextNode], visited[currentNode]]
    }
  }

  finished[currentNode] = true
}

let answer = new Set()
let cycle = null
let count = 0
for (let i = 0; i < N; i++) {
  cycle = null
  if (visited[i + 1] === -1) {
    count += 1
    map[count] = i + 1
    visited[i + 1] = count
    dfs(i + 1)
    if (cycle) {
      for (let key = cycle[0]; key <= cycle[1]; key++) {
        answer.add(map[key])
      }
    }
  }
}

console.log(answer.size)
for (let a of answer) {
  console.log(a)
}


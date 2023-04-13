const disjoinset = (n) => {
  const parents = new Array(n).fill(0).map((_, i) => i)

  const find = (a) => {
    let temp = a
    while (temp !== parents[temp]) {
      temp = parents[temp]
    }
    return temp
  }

  const union = (a, b) => {
    const parentA = find(a)
    const parentB = find(b)

    if (parentA > parentB) {
      parents[parentA] = parentB
    } else {
      parents[parentB] = parentA
    }
  }

  return {
    getParents: () => parents,
    find,
    union
  }
}

const fs = require('fs')
const input = fs.readFileSync('./16234[인구이동]/index.txt').toString().split('\n')
const [N, L, R] = input[0].split(' ').map(v => +v)
const board = []

for (let i = 0; i < N; i++) {
  board.push(input[i + 1].split(" ").map(v => +v))
}

let flag = true
let count = 0
// L 이상 R 이하 이면 인구 이동

while (flag) {
  count += 1
  const { getParents, find, union } = disjoinset(Math.pow(N, 2))
  const queue = []

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      queue.push([i, j])
    }
  }
  
  const visited = {}
  
  while (queue.length > 0) {
    const [row, col] = queue.shift()
    
    const key = JSON.stringify([row, col])
    if (key in visited) continue
    visited[key] = true
  
    for (let [drow, dcol] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const [nrow, ncol] = [row + drow, col + dcol]
  
      if (0 <= nrow && nrow < N && 0 <= ncol && ncol < N) {
        const diff = Math.abs(board[row][col] - board[nrow][ncol])
        if (L <= diff && diff <= R) {
          union(row * N + col, nrow * N + ncol)
          queue.push([nrow, ncol])
        }
      }
    }
  }

  const dp = { size: 0 }
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const key = find(i * N + j)
      if (key in dp) {
        dp[key].push([i, j])
      } else {
        dp[key] = [[i, j]]
        dp.size += 1
      }
    }
  }

  if (dp.size === Math.pow(N, 2)) {
    flag = false
  }
  
  for (let key in dp) {
    if (key === 'size') continue
    let curr = 0
    for (let [row, col] of dp[key]) {
      curr += board[row][col]
    }
    curr = Math.floor(curr / dp[key].length)
  
    for (let [row, col] of dp[key]) {
      board[row][col] = curr
    }
  }
}

console.log(count - 1)
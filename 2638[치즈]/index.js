let N, M, array;
let cheeses = new Set()
let board = []

function init() {
  const fs = require('fs')
  const input = fs.readFileSync('./2638[치즈]/index.txt').toString().split('\n')
  const [n, m] = input[0].split(" ").map(v => +v)
  N = n
  M = m
  array = []

  for (let i = 0; i < N; i++) {
    array.push(input[i + 1].split(" ").map(v => +v))
  }
  
  for (let i = 0; i < N; i++) {
    board.push([])
    for (let j = 0; j< M; j++) {
      board[i].push(0)
      if(array[i][j] === 1) {
        cheeses.add(JSON.stringify([i, j]))
      }
    }
  }
}

function setting() {
  let visited = {}
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (cheeses.has(JSON.stringify([i, j]))) {
        board[i][j] = 1
      } else {
        board[i][j] = 0
      }
    }
  }

  function dfs(row, col) {    
    for (let [drow, dcol] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const [nrow, ncol] = [row + drow, col + dcol]

      if (0 <= nrow && nrow < N && 0 <= ncol && ncol < M) {
        if (board[nrow][ncol] === 0) {
          board[nrow][ncol] = -1
          dfs(nrow, ncol)
        }
      }
    }
  }


  for (let i = 0; i < N; i++) {
    if (board[i][0] === 0) {
      dfs(i, 0)
    }

    if (board[i][M - 1] === 0)  {
      dfs(i, M - 1)
    }
  }

  for (let j = 0; j < M; j++) {
    if (board[0][j] === 0) {
      dfs(0, j)
    }

    if (board[N - 1][0] === 0) {
      dfs(N - 1, 0)
    }
  }
}

// true => 녹음 false => 녹지 않음
function findMeltingCheese(row, col) {
  let count = 0
  for (let [drow, dcol] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
    const [nrow, ncol] = [row + drow, col + dcol]
    if (0 <= nrow && nrow < N && 0 <= ncol && ncol < M) {
      if (board[nrow][ncol] === -1) {
        count += 1
      }
    } else {
      count += 1
    }
  }

  return count >= 2
}

init()
let count = 0
while (cheeses.size > 0) {
  setting()
  const newCheeses = new Set()
  for (let cheese of cheeses) {
    const [row, col] = JSON.parse(cheese)
    const isMelting = findMeltingCheese(row, col)
    if (!isMelting) {
      newCheeses.add(cheese)
    }
  }
  cheeses = newCheeses
  count += 1
}

console.log(count)

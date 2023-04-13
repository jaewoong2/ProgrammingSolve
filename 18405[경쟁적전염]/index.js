/** 
  이 문제를 BFS 로 접근 해야 하는이유
  # 작은 값 부터 바이러스가 전염됨 (이를 보장 하기 위해서 BFS 사용)
*/

const fs = require('fs')
const input = fs.readFileSync('./18405[경쟁적전염]/index.txt').toString().split('\n')
const [N, K] = input[0].split(' ').map(v => +v)
const board = []

for (let i = 0; i < N; i++) {
  board.push(input[i + 1].split(" ").map(v => +v))
}

const [S, X, Y] = input[N + 1].split(" ").map(v => +v)
const queue = []

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] !== 0) {
      queue.push([board[i][j], i, j, 0])
    }
  }
}

queue.sort((a, b) => a[0] - b[0])

while (queue.length > 0) {
  const [value, row, col, depth] = queue.shift()

  if (depth === S) continue

  for (let [drow, dcol] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
    const [nrow, ncol] = [row + drow, col + dcol]

    if (0 <= nrow && nrow < N && 0 <= ncol && ncol < N) {
      if (board[nrow][ncol] === 0) {
        board[nrow][ncol] = value
        queue.push([value, nrow, ncol, depth + 1])
      }
    } 
  }
}

console.log(board[+X - 1][+Y - 1])

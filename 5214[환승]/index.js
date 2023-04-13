const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().split('\n')
const [N, K, M] = input[0].split(" ").map(v => +v)
const board =[]

for (let i = 0; i < M; i++) {
  board.push(input[i + 1].split(" ").map(v => +v))
}

// 첫째 줄에 1번역에서 N번역으로 가는데 방문하는 역의 개수의 최솟값
let graph = {}

for (let i = 0; i < N + M; i++) {
  graph[i + 1] = new Set()
}

for (let i = 0; i < M; i++) {
  for (let value of board[i]) {
    graph[value].add(N + i + 1)
    graph[N + i + 1].add(value)
  }
}


const visited = {}
visited[1] = true
const queue = [[1, 1]]
let result = -1

while (queue.length > 0) {
  const [node, depth] = queue.shift()
  
  if (node === N) {
      result = depth
      break
  }

  for (let nextNode of graph[node]) {
    if (!(nextNode in visited)) {
      visited[nextNode] = true
      queue.push([nextNode, depth + 1])
    }
  }
}

if (result === -1) {
    console.log(result)
} else {
    console.log(Math.floor(result / 2) + 1)    
}


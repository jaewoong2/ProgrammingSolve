const fs = require('fs')
const input = fs.readFileSync('./5567[결혼식]/index.txt').toString().split('\n')

const N = +input[0]
const M = +input[1]

const graph = {}
for (let i = 0; i < M; i++) {
  const [a, b] = input[i + 2].split(" ").map(v => +v)

  if (a in graph === false) {
    graph[a] = new Set()
    graph[a].add(b)
  } else {
    graph[a].add(b)
  }
  
  if (b in graph === false) {
    graph[b] = new Set()
    graph[b].add(a)
  } else {
    graph[b].add(a)
   }
}

const visited = new Array(N + 1).fill(0).map(() => false)
const queue = [[1, 0]]
visited[1] = true

while (queue.length > 0) {
  const [node, depth] = queue.shift()

  if (!(node in graph)) {
    break
  }
  
  for (let nextNode of graph[node]) {
    if (!visited[nextNode] && depth <= 1) {
      visited[nextNode] = true
      queue.push([nextNode, depth + 1])
    }
  }
}

console.log(visited.filter(v => v).length - 1)

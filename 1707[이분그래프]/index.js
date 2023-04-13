const fs = require('fs')
const input = fs.readFileSync('./1707[이분그래프]/index.txt').toString().split('\n')

const T = +input[0]

let index = 1
for (let testCase = 0; testCase < T; testCase++) {
  const [V, E] = input[index].split(" ").map(v => +v)
  const graph = {}

  const visited = new Array(V + 1).fill(0).map(() => -1)
  const finished = new Array(V + 1).fill(0).map(() => false)

  for (let i = 1; i <= E; i++) {
    const [a, b] = input[index + i].split(" ").map(v => +v)
    if (a in graph) {
      graph[a].push(b)
    } else {
      graph[a] = [b]
    }

    if (b in graph) {
      graph[b].push(a)
    } else {
      graph[b] = [a]
    }
  }

  function dfs(node) {
    if (node in graph) {
      for (let nextNode of graph[node]) {
        if (visited[nextNode] === -1) {
          visited[nextNode] = (visited[node] + 1) % 2
          dfs(nextNode)
        } else {
          if (visited[nextNode] === visited[node]) {
            answer = "NO"
          }
        }
      }
    }
  }

  let answer
  for (let i = 0; i < V; i++) {
    if (visited[i + 1] !== -1) continue
    if (answer === 'NO') break
    answer = "YES"
    visited[i + 1] = 0
    dfs(i + 1)
  }

  console.log(answer)
  
  index += (E + 1)
}



const fs = require('fs')
const input = fs.readFileSync('./4803[트리]/index.txt').toString().split('\n')


// 트리는 사이클이 없는 연결 요소이다.
// 트리에는 여러 성질이 있다. 
// 예를 들어, 트리는 정점이 n개, 간선이 n-1개 있다.
// 또, 임의의 두 정점에 대해서 경로가 유일하다.

// 트리는 사이클이 없는 연결 요소이다.
// 트리에는 여러 성질이 있다. 
// 예를 들어, 트리는 정점이 n개, 간선이 n-1개 있다.
// 또, 임의의 두 정점에 대해서 경로가 유일하다.
let textCase = 1
let index = 0
while (true) {
  const [N, M] = input[index].split(" ").map(v => +v)
  index += 1
  const graph = new Array(N + 1).fill(0).map((_, i) => [])
  
  const visited = new Array(N + 1).fill(0).map((_, i) => -1)
  
  if (N === 0 && M === 0) break
  
  for (let i = 0; i < M; i++) {
    const [a, b] = input[index].split(" ").map(v => +v)
    graph[a].push(b)
    graph[b].push(a)
    index += 1
  }

  let count = 0
  function dfs(currentNode) {
    let result = false
    for (let nextNode of graph[currentNode]) {
      if (visited[nextNode] === -1) {
        visited[nextNode] = (visited[currentNode] + 1) % 2
        result = result ? true : dfs(nextNode)
      } else {
        if (visited[nextNode] === visited[currentNode]) {
          result = true
        }
      }
    }

    return result
  }

  for (let i = 0; i < N; i++) {
    if (visited[i + 1] === -1) {
      visited[i + 1] = 0
      if (!dfs(i + 1)) {
        count +=1
      }
    }
  }
  
  if (count > 1) {
    console.log(`Case ${textCase}: A forest of ${count} trees.`)
  } else if (count === 1) {
    console.log(`Case ${textCase}: There is one tree.`)
  } else {
    console.log(`Case ${textCase}: No trees.`)
  }

  textCase += 1
}
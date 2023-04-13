// N이 주어졌을 때, 1부터 N까지의 수로 이루어진 순열을 사전순으로 출력하는 프로그램을 작성하시오.


const fs = require('fs')
const input = fs.readFileSync('./10974[모든 순열]/index.txt').toString().split('\n')
// const input = fs.readFileSync('/dev/stdin').toString().split('\n')
const N = +input[0]

const arr = new Array(N).fill(0).map((_, i) => i + 1)

// N!

const permutaion = (r) => {
  const result = []
  const visited = {}
  
  const p = (selected) => {
    if(selected.length === r) {
      result.push(selected)
      return
    }
    
    for (let i = 0; i < arr.length; i++) {
      if (!(arr[i] in visited) || !visited[arr[i]]) {
        visited[arr[i]] = true
        p([...selected, arr[i]])
        visited[arr[i]] = false
      }
    }
  }

  p([])

  return result
}

const result = permutaion(N)

for (let r of result) {
  console.log(...r)
}
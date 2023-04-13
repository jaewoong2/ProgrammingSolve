const fs = require('fs')
let input = fs.readFileSync('./1946/index.txt').toString().split('\n')

let T = input[0]

let current = 1
for (let i = 0; i < T; i++) {
  const n = +input[current]
  const arr = []

  for (let j = 1; j <= n; j++) {
    arr.push(input[current + j].split(' ').map(Number))
  }

  current += (n + 1)

  // 풀이 시작

  arr.sort((a, b) => {
    return a[0] - b[0]
  })

  let count = 1
  let pivot = arr[0][1]  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][1] <= pivot) {
      count += 1
      pivot = arr[i][1]
    }
  }

  console.log(count)
}


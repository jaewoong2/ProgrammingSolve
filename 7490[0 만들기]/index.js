// 1부터 N까지의 수를 오름차순으로 쓴 수열 1 2 3 ... N을 생각하자.

// 그리고 '+'나 '-', 또는 ' '(공백)을 숫자 사이에 삽입하자(+는 더하기, -는 빼기, 공백은 숫자를 이어 붙이는 것을 뜻한다). 이렇게 만든 수식의 값을 계산하고 그 결과가 0이 될 수 있는지를 살피자.

// N이 주어졌을 때 수식의 결과가 0이 되는 모든 수식을 찾는 프로그램을 작성하라.

const fs = require('fs')
const input = fs.readFileSync('./7490[0 만들기]/index.txt').toString().split('\n')
// const input = fs.readFileSync('/dev/stdin').toString().split('\n')
const N = input[0]
let result = []

for (let t = 0; t < N; t++) {
  const n = input[t + 1]
  const arr = new Array(+n).fill(0).map((_, i) => i + 1)
  findZero(arr)
  result.sort()
  
  for (let r of result) {
    console.log(r)
  }

  
  result = []
  if (t !== N - 1) {
   console.log("")
  }
}

function findZero(arr) {
  function dfs(currentIndex, selected, value) {
    if(currentIndex >= arr.length) {
      if (eval(value) === 0) {
        result.push(selected)
      }
      return
    }

    dfs(currentIndex + 1, selected + `+${arr[currentIndex]}`, value + `+${arr[currentIndex]}`)
    if (currentIndex !== 0) {
      dfs(currentIndex + 1, selected +` ${arr[currentIndex]}`, `${value}${arr[currentIndex]}`)
      dfs(currentIndex + 1, selected + `-${arr[currentIndex]}`, value + `-${arr[currentIndex]}`)
    }

  }

  dfs(0, '', '')
}
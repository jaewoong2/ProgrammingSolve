// 문제
// 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

// 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열

// 입력
// 첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)

// 출력
// 한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.

// 수열은 사전 순으로 증가하는 순서로 출력해야 한다.

const fs = require('fs')
const input = fs.readFileSync('./15651[N과M(3)]/index.txt').toString().split('\n')
const [N, M] = input[0].split(' ').map(v => +v)

const arr = new Array(N).fill(0).map((_, i) => i + 1)

function combination(r) {
  const result = []
    
  function c(selected) {
    if (selected.length === r) {
      result.push(selected)
      return
    }

    for (let i = 0; i < arr.length; i++) {
        c([...selected, arr[i]])
    }
  }

  c([])

  return result
}

const result = combination(M)

for (let r of result) {
  console.log(...r)
}

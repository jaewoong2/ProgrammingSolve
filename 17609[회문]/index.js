const fs = require('fs')
const input = fs.readFileSync('./17609[회문]/index.txt').toString().split('\n')

const dp = {}
const N = +input[0]

const check = (text) => {
  return text === text.split("").reverse().join("")
}

const check2 = (text) => {
  if (check(text)) return 0
  if (text in dp) return dp[text]
  const left = 0
  const right = text.length
  const mid = Math.floor((left + right) / 2)
  
  let count = false
  let flag = 2

  for (let i = 0; i < mid; i++) {
    if (text[i] !== text[right - i - 1]) {
      count = true
      if (check(text.slice(0, i) + text.slice(i + 1))) {
        flag = 1
      }

      if (check(text.slice(0, right - i - 1) + text.slice(right - i))) {
        flag = 1
      }
      
      // 한번이라도 틀리면 (예비회문이 아닐 경우) 회문 안됨
      break
    }
  }

  if (count) {
    dp[text] = flag === 1 ? 1 : 2
    return flag === 1 ? 1 : 2
  }
  
  dp[text] = 0
  return 0
}

for (let i = 0; i < N; i++) {
  console.log(check2(input[i + 1]))
}






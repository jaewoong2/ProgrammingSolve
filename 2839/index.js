const fs = require('fs')
let input = +fs.readFileSync('./2839/index.txt').toString().split('\n')[0]
let dp = {}

function dfs(current, cnt) {
  if (current === 0) {
    return cnt
  }

  if (current in dp) return dp[current]
  
  let result = Infinity
  
  if (current >= 5) {
    result = Math.min(dfs(current - 5, cnt + 1), result)
  }

  if (current >= 3) {
    result = Math.min(dfs(current - 3, cnt + 1), result)
  }

  dp[current] = result

  return result
}

console.log(dfs(input, 0))
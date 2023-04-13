const fs = require('fs')
const input = fs.readFileSync('./16953/index.txt').toString().split('\n')[0]

let [a, b] = input.split(' ')

let dp = {}


function dfs(current, depth) {
  if(current === b) {
    return depth
  }

  if (current in dp) return dp[current]
  
  let result = Infinity

  if (2 * +current <= b) {
    result = Math.min(result, dfs(`${2 * +current}`, depth + 1))
  }

  if (+`${current}1` <= b) {
    result = Math.min(result, dfs(`${current}1`, depth + 1))
  }

  dp[current] = result

  return result
}

const value = dfs(a, 0)

console.log(value === Infinity ? -1 : value)
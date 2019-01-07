const path = require('path')
const withTypescript = require('@zeit/next-typescript')

const pwd = (source, ...args) => {
  let target = ''
  for (let i = 0; i < source.length; i++) {
    const current = source[i]
    const arg = args[i] || ''
    target += current + arg
  }
  return path.resolve(__dirname, target)
}

module.exports = withTypescript({
  webpack(config) {
    config.resolve.alias['@'] = pwd`.`
    return config
  },
})

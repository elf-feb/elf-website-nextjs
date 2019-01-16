require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const withTypescript = require('@zeit/next-typescript')
const dev = process.env.NODE_ENV !== 'production'

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
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(
          __dirname,
          `env/${process.env.NODE_ENV}.env`
        ),
        systemvars: true,
      })
    ]

    return config
  },
})

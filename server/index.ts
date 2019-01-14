// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const _ = require('lodash')
const glob = require('glob')
const next = require('next')
const accepts = require('accepts')
const IntlPolyfill = require('intl')
const { basename } = require('path')
const { readFileSync } = require('fs')
const { createServer } = require('http')
const { parse } = require('url')

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

// Hapi Server
const Hapi = require('hapi')
const server = new Hapi.Server({
  port
})

// PostgreSQL & Knew
const Knex = require('knex')
const PG = require('pg')

Knex({
  client: 'pg', //指明数据库类型，还可以是mysql，sqlite3等等
  connection: { //指明连接参数
    host: '47.105.184.229:5432',
    user: 'postgres',
    password: 'sdh19930721',
    database: 'node_01'
  },
  debug: true, //指明是否开启debug模式，默认为true表示开启
  pool: { //指明数据库连接池的大小，默认为{min: 2, max: 10}
    min: 0,
    max: 7,
  },
  acquireConnectionTimeout: 10000, //指明连接计时器大小，默认为60000ms
  migrations: {
    tableName: 'migrations' //数据库迁移，可选
  }
})

// 通过查找`lang /`dir中的翻译来获取支持的语言
const supportedLanguages = glob.sync('../../static/lang/*.json').map((f) => basename(f, '.json'))

// 我们需要在用户请求中公开React Intl的语言环境数据
// locale。 此函数还将通过lang在内存中缓存脚本
const localeDataCache = new Map()
const getLocaleDataScript = (locale) => {
  const lang = locale.split('-')[0]
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }
  return localeDataCache.get(lang)
}

// 我们需要加载并公开用户请求的翻译
// locale。 这些只会在生产中使用，在dev中使用`defaultMessage`
// 将使用源代码中的每个消息描述
const getMessages = (locale) => {
  return require(`../../static/lang/${locale}.json`)
}

const checkLocales = (req: any): string => {
  if (
    _.hasIn(req, 'headers.host') &&
    _.get(req, 'headers.host') !== '' &&
    !dev
  ) {
    const locales = _.get(req, 'headers.host')
    if (locales.indexOf('zh') !== -1) { return 'zh' }
    if (locales.indexOf('en') !== -1) { return 'en' }
    if (locales.indexOf('fr') !== -1) { return 'fr' }
    if (locales.indexOf('ja') !== -1) { return 'ja' }
  }
  return 'en'
}

const pathWrapper = (app: any, pathName: string, opts?: any) => async ({ raw, query, params }) => {
  const locale = checkLocales(raw.req) // 通过 host 判断 => 切换语言
  const RAW = _.assign({}, raw, {
    req: _.assign({}, raw.req, {
      locale,
      localeDataScript: getLocaleDataScript(locale),
      messages: dev ? {} : getMessages(locale),
    })
  })
  return app.renderToHTML(RAW.req, RAW.res, pathName, { ...query, ...params }, opts)
}

const nextHandlerWrapper = app => {
  const handler = app.getRequestHandler()
  return async ({ raw, url }, h) => {
    await handler(raw.req, raw.res, url)
    return h.close
  }
}

const defaultHandlerWrapper = app => async ({ raw: { req, res }, url }) => {
  const { pathname, query } = parse(url, true)
  return app.renderToHTML(req, res, pathname, query)
}

app
  .prepare()
  .then(async () => {
    server.route({
      method: 'GET',
      path: '/about',
      handler: pathWrapper(app, '/about'),
    })

    server.route({
      method: 'GET',
      path: '/', /* catch all route */
      handler: pathWrapper(app, '/'),
    })

    server.route({
      method: 'GET',
      path: '/_next/{p*}', /* next 特定的 routes */
      handler: nextHandlerWrapper(app),
    })

    server.route({
      method: 'GET',
      path: '/{p*}', /* catch all route */
      handler: pathWrapper(app, '/'),
    })

    try {
      await server.start()
      console.log(`> Ready on http://localhost:${port}`)
    } catch (error) {
      console.log('Error starting server')
      console.log(error)
    }
  })

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
// import _ from 'lodash'

import { createServer } from 'http'
import { parse } from 'url'
import * as next from 'next'

// import checkLocales from '@/utils/checkLocales'
const _ = require('lodash')
const IntlPolyfill = require('intl')
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

const { readFileSync } = require('fs')
const { basename } = require('path')
const accepts = require('accepts')
const glob = require('glob')


const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// 通过查找`lang /`dir中的翻译来获取支持的语言
const supportedLanguages = glob.sync('./lang/*.json').map((f) => basename(f, '.json'))

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
  return require(`./static/locales/${locale}.json`)
}

// const checkLocales = (req) => {
//   if (_.hasIn(req, 'headers.host') && _.get(req, 'headers.host') !== '') {
//     const locales = _.get(req, 'headers.host')
//     if (locales.indexOf('zh') !== -1) { return 'zh' }
//     if (locales.indexOf('en') !== -1) { return 'en' }
//     if (locales.indexOf('fr') !== -1) { return 'fr' }
//     if (locales.indexOf('jp') !== -1) { return 'ja' }
//   }
//   return 'en'
// }

app.prepare()
.then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)

    const accept = accepts(req)
    const locale = accept.language(accept.languages(supportedLanguages)) || 'en_US'
    // const locale = checkLocales(req) // en_US

    // req.locale = locale
    // req.localeDataScript = getLocaleDataScript(locale)
    // req.messages = dev ? {} : getMessages(locale)

    // 改名 => 常量
    const REQ = _.assign({}, req, {
      locale,
      localeDataScript: getLocaleDataScript(locale),
      messages: dev ? {} : getMessages('fr'),
    })

    const { pathname, query } = parsedUrl
    if (pathname === '/a') {
      app.render(REQ, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(REQ, res, '/b', query)
    } else {
      handle(REQ, res, parsedUrl)
    }
  })
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

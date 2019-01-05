import React from 'react'
import intl from 'react-intl-universal'
import _ from 'lodash'
import http from "axios"
import App, { Container } from 'next/app'

import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import IntlPolyfill from "intl"

import createStore from '../saga/store'
import checkLocales from '@/utils/checkLocales'

// For Node.js, common locales should be added in the application
global.Intl = IntlPolyfill
require('intl/locale-data/jsonp/en.js')
require('intl/locale-data/jsonp/zh.js')
require('intl/locale-data/jsonp/fr.js')
require('intl/locale-data/jsonp/ja.js')

const SUPPOER_LOCALES = [
  {
    name: "English",
    value: "en_US",
  },
  {
    name: "简体中文",
    value: "zh_CN",
  },
  {
    name: "français",
    value: "fr_FR",
  },
  {
    name: "日本の",
    value: "ja_JP",
  },
]

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }
    const currentLocale = checkLocales(ctx.req) // Determine user's locale here
    intl.init({
      currentLocale,
      locales: {
        [currentLocale]: require(`../static/locales/${currentLocale}`)
      }
    })
    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(
  withReduxSaga({ async: true })
  (MyApp)
)

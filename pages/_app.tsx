import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { IntlProvider, addLocaleData } from 'react-intl'
import _ from 'lodash'

import createStore from '../saga/store'
import { changeLocale } from '@/saga/actions'

import checkLocales from '@/utils/checkLocales'
import locale_en from 'react-intl/locale-data/en'
import locale_fr from 'react-intl/locale-data/fr'
import locale_zh from 'react-intl/locale-data/zh'
// import locale_ja from 'react-intl/locale-data/ja'

import messages_en from '../static/lang/en.json'
import messages_fr from '../static/lang/fr.json'
import messages_zh from '../static/lang/zh.json'

const messages = {
  en: messages_en,
  fr: messages_fr,
  zh: messages_zh,
}

addLocaleData([
  ...locale_en,
  ...locale_fr,
  ...locale_zh,
])

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req, store } = ctx

    const locale = _.isUndefined(req) && !!window
      ? checkLocales(window.location.hostname)
      : checkLocales(req)
    store.dispatch(
      changeLocale(
        locale
      )
    )
    const initialNow = Date.now()
    return {
      pageProps,
      locale,
      initialNow,
    }
  }

  render () {
    const { Component, pageProps, initialNow, store } = this.props

    let locale = ''
    if (!!this.props.isServer) {
      locale = this.props.locale
    } else {
      locale = checkLocales(window.location.hostname)
    }

    return (
      <Container>
        <IntlProvider
          locale={locale}
          messages={messages[locale]}
          initialNow={initialNow}
        >
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </IntlProvider>
      </Container>
    )
  }
}

export default withRedux(createStore)(
  withReduxSaga({ async: true })
    (MyApp)
)

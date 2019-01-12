import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import _ from 'lodash'
import withReduxSaga from 'next-redux-saga'
import { IntlProvider, addLocaleData } from 'react-intl'

// Material
import { MuiThemeProvider } from '@material-ui/core/styles'
import { MuiThemeProviderProps } from '@material-ui/core/styles/MuiThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '@/src/getPageContext'
import { GenerateClassName, SheetsRegistry } from 'jss'

// Redux saga
import createStore from '../saga/store'
import { changeLocale } from '@/saga/actions'

// Intl
import checkLocales from '@/utils/checkLocales'
import locale_en from 'react-intl/locale-data/en'
import locale_fr from 'react-intl/locale-data/fr'
import locale_zh from 'react-intl/locale-data/zh'
import locale_ja from 'react-intl/locale-data/ja'

import messages_en from '../static/lang/en.json'
import messages_fr from '../static/lang/fr.json'
import messages_zh from '../static/lang/zh.json'
import messages_ja from '../static/lang/ja.json'

const messages = {
  en: messages_en,
  fr: messages_fr,
  zh: messages_zh,
  ja: messages_ja,
}

addLocaleData([
  ...locale_en,
  ...locale_fr,
  ...locale_zh,
  ...locale_ja,
])

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}

interface PageContext extends MuiThemeProviderProps {
  generateClassName: GenerateClassName<string> // not sure what goes here
  sheetsRegistry: SheetsRegistry
}

class MyApp extends App<any> {
  static async getInitialProps ({ Component, ctx }) {
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

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
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
            <JssProvider
              registry={this.pageContext.sheetsRegistry}
              generateClassName={this.pageContext.generateClassName}
            >
              {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
              <MuiThemeProvider
                theme={this.pageContext.theme}
                sheetsManager={this.pageContext.sheetsManager}
              >
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
                <Component pageContext={this.pageContext} {...pageProps} />
              </MuiThemeProvider>
            </JssProvider>
          </Provider>
        </IntlProvider>
      </Container>
    )
  }

  private pageContext: PageContext
}

export default withRedux(createStore)(
  withReduxSaga({ async: true })
    (MyApp)
)

import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
class IntlDocument extends Document<any> {
  static async getInitialProps (context) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage
    context.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
    })

    const props: any = await super.getInitialProps(context)
    const {req: {locale, localeDataScript}} = context
    return {
      ...props,
      styles: [
        ...props.styles,
        ...sheet.getStyleElement()
      ],
      locale,
      localeDataScript
    }
  }

  render () {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`
    const { pageContext } = this.props

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext ? pageContext.theme.palette.primary.main : null}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script dangerouslySetInnerHTML={{ __html: this.props.localeDataScript }} />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default IntlDocument

import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import PropTypes from 'prop-types'
import flush from 'styled-jsx/server'

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
class IntlDocument extends Document<any> {
  static async getInitialProps (context) {
    const props = await super.getInitialProps(context)
    const {req: {locale, localeDataScript}} = context
    return {
      ...props,
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

// Material
IntlDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  let pageContext
  const page = ctx.renderPage(Component => {
    const WrappedComponent = props => {
      pageContext = props.pageContext
      return <Component {...props} />
    };

    WrappedComponent.propTypes = {
      pageContext: PropTypes.object.isRequired,
    };

    return WrappedComponent
  })

  let css
  // It might be undefined, e.g. after an error.
  if (pageContext) {
    css = pageContext.sheetsRegistry.toString()
  }

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: css }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  }
}

export default IntlDocument

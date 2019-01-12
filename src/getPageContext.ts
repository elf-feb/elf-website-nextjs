/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-12 11:08:02
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-12 11:08:42
 * @Description:
 */
import { SheetsRegistry } from 'jss'
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
})

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  }
}

let pageContext

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext()
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext()
  }

  return pageContext
}

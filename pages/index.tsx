import React from 'react'
import isNull from 'lodash/isNull'
import http from 'axios'
import { connect } from 'react-redux'
import intl from 'react-intl-universal'
import _ from 'lodash'

import { InitProps } from 'types'
import checkLocales from '@/utils/checkLocales'
import { loadData, startClock, tickClock } from '@/saga/actions'
import Page from '@/components/page'

interface Props {
  dispatch: Function,
  simple: string,
  locales: string,
  hello: string,
}

class Index extends React.Component<Props, {}> {
  static async getInitialProps(initProps: InitProps) {
    const { store, isServer, req } = initProps.ctx
    store.dispatch(tickClock(isServer))
    if (isNull(store.getState().get('placeholderData'))) {
      store.dispatch(loadData())
    }
    return {
      isServer,
      locales: checkLocales(req.headers.host),
    }
  }

  constructor (props: Props) {
    super(props)
    this.loadLocales()
  }

  componentDidMount() {
    this.props.dispatch(startClock())
  }

  loadLocales() {
    // let currentLocale = intl.determineLocale({
    //   urlLocaleKey: 'lang',
    //   cookieLocaleKey: 'lang',
    // })
    let currentLocale = this.props.locales
    http
      .get(`../static/locales/${currentLocale}.json`)
      .then(res => {
        console.log("App locale data", res.data)
        // init method will load CLDR locale data according to currentLocale
        return intl.init({
          currentLocale,
          locales: {
            [currentLocale]: res.data
          }
        })
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true })
      })
  }

  render() {
    // console.log('isServer ===> ', this.props.isServer)
    // debugger
    return (
      <div>
        <div>{intl.get('SIMPLE') || ''}</div>
        <Page
          title="Index Page"
          linkTo="/other"
          NavigateTo="Other Page"
        />
      </div>
    )
  }
}

export default connect()(Index)

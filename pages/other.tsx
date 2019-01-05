import React from 'react'
import {connect} from 'react-redux'
import { InitProps } from 'types'
import {startClock, tickClock} from '@/saga/actions'
import Page from '@/components/page'

import http from 'axios'
import intl from 'react-intl-universal'
import checkLocales from '@/utils/checkLocales'

interface Props {
  dispatch: Function,
  locales: string,
}

class Other extends React.Component<Props, {}> {
  static async getInitialProps (initProps: InitProps) {
    const { store, isServer, req } = initProps.ctx
    store.dispatch(tickClock(isServer))
    return {
      isServer,
      locales: checkLocales(req.headers.host),
    }
  }

  constructor(props: Props) {
    super(props)
    this.loadLocales()
  }

  loadLocales() {
    let currentLocale = this.props.locales
    http
      .get(`../static/locales/${currentLocale}.json`)
      .then(res => {
        console.log("App locale data", res.data)
        return intl.init({
          currentLocale,
          locales: {
            [currentLocale]: res.data
          }
        })
      })
      .then(() => {
        this.setState({ initDone: true })
      })
  }

  componentDidMount () {
    this.props.dispatch(startClock())
  }

  render () {
    return (
      <div>
        <div>{intl.get('HELLO', { name: 'Tony', where: 'Alibaba' })}</div>
        <Page title="Other Page" linkTo="/" NavigateTo="Index Page" />
      </div>
    )
  }
}

export default connect()(Other)

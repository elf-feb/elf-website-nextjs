import React from 'react'
import isNull from 'lodash/isNull'
import { connect } from 'react-redux'
// import intl from 'react-intl-universal'

import { InitProps } from 'types'
import checkLocales from '@/utils/checkLocales'
import { loadData, startClock, tickClock } from '@/saga/actions'
import Page from '@/components/page'
import loadLocales from '@/utils/loadLocales'
import getLocalesText from '@/utils/getLocalesText'

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
    // console.log('req ===> ', req)
    // debugger
    return {
      isServer,
      locales: checkLocales(req),
    }
  }

  constructor (props: Props) {
    super(props)
    loadLocales(this.props.locales, this)
  }

  componentDidMount() {
    this.props.dispatch(startClock())
  }

  render() {
    return (
      <div>
        <div>{getLocalesText('SIMPLE')}</div>
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

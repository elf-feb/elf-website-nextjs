import React from 'react'
import isNull from 'lodash/isNull'
import { connect } from 'react-redux'
import intl from 'react-intl-universal'

import { InitProps } from 'types'
import { loadData, startClock, tickClock } from '@/saga/actions'
import Page from '@/components/page'

interface Props {
  dispatch: Function,
  intl: any,
  simple: string,
  hello: string,
}

class Index extends React.Component<Props, {}> {
  static async getInitialProps(initProps: InitProps) {
    const { store, isServer } = initProps.ctx
    store.dispatch(tickClock(isServer))
    if (isNull(store.getState().get('placeholderData'))) {
      store.dispatch(loadData())
    }
    return {
      isServer,
      intl,
      simple: intl.get('SIMPLE'),
      hello: intl.get('HELLO', { name: 'Tony', where: 'Alibaba' }),
    }
  }

  componentDidMount() {
    this.props.dispatch(startClock())
  }

  render() {
    return (
      <div>
        {/* <div>{this.props.intl.get('SIMPLE')}</div> */}
        <div>{this.props.hello}</div>

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

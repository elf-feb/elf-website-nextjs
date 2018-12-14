import React from 'react'
import isNull from 'lodash/isNull'
import { connect } from 'react-redux'

import { InitProps } from 'types'
import { loadData, startClock, tickClock } from '@/saga/actions'
import Page from '@/components/page'

interface Props {
  dispatch: Function,
}

class Index extends React.Component<Props, {}> {
  static async getInitialProps(initProps: InitProps) {
    const { store, isServer } = initProps.ctx
    store.dispatch(tickClock(isServer))
    if (isNull(store.getState().get('placeholderData'))) {
      store.dispatch(loadData())
    }
    return { isServer }
  }

  componentDidMount() {
    this.props.dispatch(startClock())
  }

  render() {
    return <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />
  }
}

export default connect()(Index)

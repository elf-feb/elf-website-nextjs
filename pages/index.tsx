import React from 'react'
// import Link from 'next/link'
import { connect } from 'react-redux'
import isNull from 'lodash/isNull'

import { loadData, startClock, tickClock } from '@/saga/actions'
import Page from '../components/page'

interface Props {
  dispatch: Function,
}

class Index extends React.Component<Props, {}> {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx
    store.dispatch(tickClock(isServer))
    if (isNull(store.getState().get('placeholderData'))) {
      debugger
      store.dispatch(loadData())
    }
    return { isServer }
  }

  // componentDidMount() {
  //   this.props.dispatch(startClock())
  // }

  render() {
    return <Page title='Index Page' linkTo='/other' NavigateTo='Other Page' />
  }
}

export default connect()(Index)

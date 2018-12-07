import React from 'react'
// import Link from 'next/link'
import { connect } from 'react-redux'

import { loadData, startClock, tickClock } from '../saga/actions'
import Page from '../components/page'

// export default () => (
//   <ul>
//     <li><Link href='/a' as='/a'><a>a</a></Link></li>
//     <li><Link href='/b' as='/b'><a>b</a></Link></li>
//   </ul>
// )

interface Props {
  dispatch: Function,
}

class Index extends React.Component<Props, {}> {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx
    store.dispatch(tickClock(isServer))
    if (!store.getState().placeholderData) {
      store.dispatch(loadData())
    }
    return { isServer }
  }

  componentDidMount() {
    this.props.dispatch(startClock())
  }

  render() {
    return <Page title='Index Page' linkTo='/other' NavigateTo='Other Page' />
  }
}

export default connect()(Index)

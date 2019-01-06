import React from 'react'

import { FormattedRelative } from 'react-intl'
import {connect} from 'react-redux'
import Layout from '@/components/Layout'

import { InitProps } from 'types'
import {startClock, tickClock} from '@/saga/actions'
import Page from '@/components/page'

interface Props {
  dispatch: Function,
  someDate: any,
}

class Other extends React.Component<Props, {}> {
  static async getInitialProps (initProps: InitProps) {
    const { store, isServer, req } = initProps.ctx
    store.dispatch(tickClock(isServer))
    return {
      isServer,
      someDate: Date.now(),
    }
  }

  componentDidMount () {
    this.props.dispatch(startClock())
  }

  render () {
    return (
      <Layout>
        <p>
          <FormattedRelative
            value={this.props.someDate}
            updateInterval={1000}
          />
        </p>

        <Page title="Other Page" linkTo="/" NavigateTo="Index Page" />
      </Layout>
    )
  }
}

export default connect()(Other)

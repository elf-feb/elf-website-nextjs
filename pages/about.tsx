import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedRelative, injectIntl } from 'react-intl'
import Layout from '@/components/Layout'

import { InitProps } from 'types'
import { startClock, tickClock } from '@/saga/actions'
import Page from '@/components/Page'

interface Props {
  dispatch: Function,
  intl: any,
  isServer: boolean,
  someDate: any,
}

class About extends Component<Props, {}> {
  static async getInitialProps({ store, isServer }: InitProps) {
    store.dispatch(tickClock(isServer))
    return {
      isServer,
      someDate: Date.now(),
    }
  }

  componentDidMount() {
    this.props.dispatch(startClock())
  }

  render() {
    return (
      <Layout>
        <p>
          <FormattedRelative
            value={this.props.someDate}
            updateInterval={1000}
          />
        </p>

        <Page title="Other Page" />
      </Layout>
    )
  }
}

export default injectIntl(
  connect()(About)
)

import React, { Component } from 'react'
import isNull from 'lodash/isNull'
import { connect } from 'react-redux'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import Layout from '../components/Layout'

import { InitProps } from 'types'
import { loadData, startClock, tickClock } from '@/saga/actions'
import Page from '@/components/Page'

interface Props {
  dispatch: Function,
  intl: any,
  simple: string,
  hello: string,
}

class Index extends Component<Props, {}> {
  static async getInitialProps({ store, isServer }: InitProps) {
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
    return (
      <Layout>
        <p>
          <FormattedMessage
            id='greeting'
            defaultMessage='Hello, World!'
            description="Welcome header on app main page"
          />
        </p>
        <p>
          <FormattedNumber value={1000} />
        </p>

        <Page title="Index Page" />
      </Layout>
    )
  }
}

export default injectIntl(
  connect()(Index)
)

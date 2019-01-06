import React from 'react'
import isNull from 'lodash/isNull'
import { connect } from 'react-redux'

import { FormattedMessage, FormattedNumber, defineMessages } from 'react-intl'
import Head from 'next/head'
import Layout from '../components/Layout'
import withIntl from '../lib/withIntl'

import { InitProps } from 'types'
import { loadData, startClock, tickClock } from '@/saga/actions'
import Page from '@/components/page'

interface Props {
  dispatch: Function,
  intl: any,
}

const { description } = defineMessages({
  description: {
    id: 'description',
    defaultMessage: '将 React Intl与Next.js集成的示例应用程序'
  }
})

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
    const { intl } = this.props

    return (
      <Layout>
        <Head>
          <meta name='description' content={intl.formatMessage(description)} />
        </Head>
        <p>
          <FormattedMessage id='greeting' defaultMessage='Hello, World!' />
        </p>
        <p>
          <FormattedNumber value={1000} />
        </p>

        <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />
      </Layout>
    )
  }
}

export default connect()(
  withIntl(Index)
)

import React from 'react'
import {defineMessages, injectIntl} from 'react-intl'
import Head from 'next/head'
import Nav from './Nav'

const messages = defineMessages({
  title: {
    id: 'title',
    defaultMessage: 'React Intl Next.js 案例'
  }
})

interface Props {
  intl?: any,
  title?: string,
  children?: any,
}

export default injectIntl(({ intl, title, children }: Props) => (
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title || intl.formatMessage(messages.title)}</title>
    </Head>

    <header>
      <Nav />
    </header>

    {children}
  </div>
))

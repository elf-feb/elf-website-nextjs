/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-06 22:23:43
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-06 22:24:22
 * @Description:
 */
import React from 'react'
import { defineMessages, injectIntl } from 'react-intl'
import Head from 'next/head'
import Nav from './Nav'

const messages = defineMessages({
  title: {
    id: 'title',
    defaultMessage: 'React Intl Next.js Example'
  }
})

export default injectIntl(({ intl, title, children }) => (
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

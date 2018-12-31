import Link from 'next/link'
import { connect } from 'react-redux'
import React from 'react'
import { Map } from 'immutable'
import _ from 'lodash'

import Counter from './counter'
import Clock from './clock'

interface Props {
  title: string,
  linkTo: string,
  NavigateTo: string,
  count?: number,
  error?: boolean | any, // { message: string }
  light?: boolean,
  dispatch?: Function,
  lastUpdate?: number,
  placeholderData?: any,
}

class Page extends React.Component<Props, any> {
  render () {
    const {
      error,
      title,
      count,
      light,
      linkTo,
      dispatch,
      NavigateTo,
      lastUpdate,
      placeholderData,
    } = this.props

    return (
      <div>
        <h1>{title}</h1>
        <Clock lastUpdate={lastUpdate} light={light} />
        <Counter count={count} dispatch={dispatch} />

        <nav>
          <Link href={linkTo}>
            <a> Navigate: {NavigateTo} </a>
          </Link>
        </nav>

        {!!placeholderData &&
          <pre>
            <code>
              {JSON.stringify(placeholderData, null, 2)}
            </code>
          </pre>}

        {!!error &&
          <p style={{ color: 'red' }}>
            Error: {error.message}
          </p>}
      </div>
    )
  }
}

export default connect((state: Map<any, any>) => state.toJS())(Page)

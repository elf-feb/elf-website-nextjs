import Link from 'next/link'
import { connect } from 'react-redux'
// import { Map } from 'immutable'
import React from 'react'
import Counter from './counter'
import isObject from 'lodash/isObject'

interface Props {
  NavigateTo: string,
  count: number,
  dispatch: Function,
  error: boolean | any, // { message: string }
  lastUpdate: number,
  light: boolean,
  linkTo: string,
  placeholderData: any,
  title: string,
}

class Page extends React.Component<Props, any> {
  render () {
    const {
      error,
      title,
      count,
      linkTo,
      dispatch,
      NavigateTo,
      placeholderData,
    } = this.props

    return (
      <div>
        <h1>{title}</h1>
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

export default connect(state => state.toJS())(Page)

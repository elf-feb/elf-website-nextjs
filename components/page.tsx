import Link from 'next/link'
import { connect } from 'react-redux'
// import { Map } from 'immutable'
import React from 'react'
import Counter from './counter'

interface Props {
  NavigateTo: string,
  count: number,
  dispatch: Function,
  error: boolean,
  lastUpdate: number,
  light: boolean,
  linkTo: string,
  placeholderData: any,
  title: string,
}

class Page extends React.Component<Props, any> {
  render () {
    const {
      title,
      count,
      dispatch,
    } = this.props

    return (
      <div>
        <h1>{title}</h1>

        <Counter count={count} dispatch={dispatch}
        />
      </div>
    )
  }
}

export default connect(state => state.toJS())(Page)

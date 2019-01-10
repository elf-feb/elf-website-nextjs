/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-08 14:30:50
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-10 19:51:24
 * @Description:
 */
import { connect } from 'react-redux'
import React from 'react'
import { Map } from 'immutable'
import _ from 'lodash'

import Counter from './Counter'
import Clock from './Clock'

interface Props {
  title: string,
  count?: number,
  error?: boolean | any, // { message: string }
  light?: boolean,
  dispatch?: Function,
  lastUpdate?: number,
  placeholderData?: any,
}

class Page extends React.Component<Props, any> {
  render() {
    const {
      error,
      title,
      count,
      light,
      dispatch,
      lastUpdate,
      placeholderData,
    } = this.props

    return (
      <div>
        <h1>{title}</h1>
        <Clock lastUpdate={lastUpdate} light={light} />
        <Counter count={count} dispatch={dispatch} />

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

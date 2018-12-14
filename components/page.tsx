import Link from 'next/link'
import { connect } from 'react-redux'
// import { Map } from 'immutable'
import React from 'react'

class Page extends React.Component<any, any> {
  render () {
    debugger

    return (
      <div>
        <h1>
          {this.props.title}
        </h1>

        {/* <Counter /> */}
      </div>
    )
  }
}

export default connect(state => state.toJS())(Page)

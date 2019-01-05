import React from 'react'
import { connect } from 'react-redux'
import intl from 'react-intl-universal'

import { InitProps } from 'types'

interface Props {
  dispatch: Function,
}

class Lang extends React.Component<Props, {}> {
  static async getInitialProps(initProps: InitProps) {
    const { store, isServer } = initProps.ctx
    return {
      isServer,
    }
  }

  componentDidMount() {
    // this.props.dispatch(startClock())
  }

  render() {
    return (
      <div>
        {/* <div>{this.props.intl.get('SIMPLE')}</div> */}
        <div>{this.props.hello}</div>
      </div>
    )
  }
}

export default connect()(Lang)

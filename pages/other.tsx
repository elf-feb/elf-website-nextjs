import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { InitProps } from 'types'
import { startClock, tickClock } from '@/saga/actions'
import Page from '@/components/page'
import checkLocales from '@/utils/checkLocales'
import loadLocales from '@/utils/loadLocales'
import getLocalesText from '@/utils/getLocalesText'

interface Props {
  dispatch: Function,
  locales: string,
}

class Other extends React.Component<Props, {}> {
  static async getInitialProps (initProps: InitProps) {
    const { store, isServer, req } = initProps.ctx
    store.dispatch(tickClock(isServer))
    // console.log('req ===> ', req)
    // debugger
    return {
      isServer,
      locales: checkLocales(req),
    }
  }

  constructor(props: Props) {
    super(props)
    loadLocales(this.props.locales, this)
  }

  componentDidMount () {
    this.props.dispatch(startClock())
  }

  render () {
    return (
      <div>
        {/* <div>{intl.get()}</div> */}
        <div>
          {getLocalesText('HELLO', { name: 'Tony', where: 'Alibaba' })}
        </div>
        <Page title="Other Page" linkTo="/" NavigateTo="Index Page" />
      </div>
    )
  }
}

export default connect()(Other)

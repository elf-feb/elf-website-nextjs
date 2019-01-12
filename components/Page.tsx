/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-08 14:30:50
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-12 11:22:42
 * @Description:
 */
import { connect } from 'react-redux'
import React from 'react'
import { Map } from 'immutable'
import _ from 'lodash'

// Material
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

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
  classes: any,
}

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})

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
      classes,
    } = this.props

    return (
      <div className={classes.root}>
        <h1>{title}</h1>
        <Clock lastUpdate={lastUpdate} light={light} />
        <Counter count={count} dispatch={dispatch} />

        <Typography variant="h2" gutterBottom>
          Material-UI
        </Typography>

        <Button variant="contained" color="primary">
          Do nothing button
        </Button>

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

export default connect(
  (state: Map<any, any>) => state.toJS()
)(
  withStyles(styles)(Page)
)

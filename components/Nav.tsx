import React from 'react'
import {FormattedMessage} from 'react-intl'
import Link from 'next/link'

// Material
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  nav: {
    // textAlign: 'center',
    // paddingTop: theme.spacing.unit * 20,
  },
})

const Nav = (props) => {
  const { classes } = props

  return (
    <nav className={classes.nav}>
      <li>
        <Button variant="contained" color="secondary">
          <Link href='/'>
            <FormattedMessage id='nav.home' defaultMessage='Home' />
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="contained" color="secondary">
          <Link href='/about'>
            <FormattedMessage id='nav.about' defaultMessage='About' />
          </Link>
        </Button>
      </li>

      <style jsx>{`
        nav {
          display: flex;
        }
        li {
          list-style: none;
          margin-right: 1rem;
        }
      `}</style>
    </nav>
  )
}

export default withStyles(styles)(Nav)

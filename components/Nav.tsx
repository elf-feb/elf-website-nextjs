import React from 'react'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import styled from 'styled-components'

// Material
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  nav: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})

const NavBox = styled.nav`
  display: flex;
  li {
    list-style: none;
    margin-right: 1rem;
  }
`

const link = (href: string) => Router.push(href)

const Nav = (props) => {
  const { classes } = props
  return (
    <NavBox className={classes.nav}>
      <li>
        <Button variant="contained" color="secondary" onClick={() => link('/')}>
          <FormattedMessage id='nav.home' defaultMessage='Home' />
        </Button>
      </li>
      <li>
        <Button variant="contained" color="secondary" onClick={() => link('/about')}>
          <FormattedMessage id='nav.about' defaultMessage='About' />
        </Button>
      </li>
    </NavBox>
  )
}

export default withStyles(styles)(Nav)

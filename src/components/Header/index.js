import React, { Component } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import s from 'styled-components'

import { BORDER, BLACK, WHITE } from '../../constants/colors'
import { maxWidth, TABLET } from '../../constants/widths'
import Logo from './Logo'
import Links from './Links'
import Footer from './Footer'
import Bars from './Bars'

const MOBILE_NAV_HEIGHT = '53px'

const Nav = s.nav`
  position: fixed;
  width: 20%;
  padding: calc(1rem + 2.5%) 1rem;
  border-right: 1px solid ${BORDER};
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  ${maxWidth(TABLET)} {
    width: 100%;
    padding: 0.5rem 1rem;
    border-right: 0;
    border-bottom: 1px solid ${BORDER};
    min-height: 0;
    z-index: 1300;
    background: ${WHITE};
    overflow-y: hidden;

    ${({ active }) => active ? `
      max-height: 100vh;
    ` : `
      max-height: ${MOBILE_NAV_HEIGHT};
    `}
  }
`

const NavSpacer = s.div`
  width: 20%;

  ${maxWidth(TABLET)} {
    width: 100%;
    height: ${MOBILE_NAV_HEIGHT};
  }
`

const LogoText = s(Link)`
  color: ${BLACK} !important;
  text-decoration: none !important;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  display: block;

  ${maxWidth(TABLET)} {
    display: inline-block;
    vertical-align: top;
    margin-top: 0.375rem;
    margin-bottom: 0;
    font-size: 1.25rem;
  }
`

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = { active: false }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    const { active } = this.state
    this.setState({ active: !active })
  }

  render () {
    const { siteTitle } = this.props
    const { active } = this.state

    return (
      <>
        <Nav active={active}>
          <Logo />

          <Bars handleClick={this.toggle} />

          <LogoText to="/">
            {siteTitle}
          </LogoText>

          <Links active={active} />

          <Footer active={active} />
        </Nav>

        <NavSpacer />
      </>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

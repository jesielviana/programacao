import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import s from 'styled-components'

import { BORDER, BLACK } from '../../constants/colors'
import Logo from './Logo'
import Links from './Links'
import Footer from './Footer'

const Nav = s.nav`
  position: fixed;
  width: 20%;
  padding: 1rem;
  border-right: 1px solid ${BORDER};
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`

const NavSpacer = s.div`
  width: 20%;
`

const LogoText = s(Link)`
  color: ${BLACK} !important;
  text-decoration: none !important;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  display: block;
`

const Header = ({ siteTitle }) => (
  <>
    <Nav>
      <Logo />

      <LogoText to="/">
        {siteTitle}
      </LogoText>

      <Links />

      <Footer />
    </Nav>

    <NavSpacer />
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

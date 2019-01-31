import React from 'react'
import s from 'styled-components'

import logo from '../../images/logo.svg'

const Wrapper = s.img`
  width: 3rem;
  height: auto;
  margin-top: calc(1rem + 2.5%);
  margin-bottom: 1.5rem;
`

export default () => (
  <Wrapper src={logo} alt="CIS 197 Logo" />
)

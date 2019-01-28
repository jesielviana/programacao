import React from 'react'
import s from 'styled-components'

import { GRAY } from '../../constants/colors'

const Footer = s.footer`
  width: 100%;
  padding: 1rem 0;
  color: ${GRAY};
  font-size: 0.8rem;
  position: absolute;
  bottom: 0;
`

export default () => (
  <Footer>
    CIS 197 Staff &copy; {new Date().getFullYear()}
  </Footer>
)

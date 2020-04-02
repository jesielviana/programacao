import React from 'react'
import s from 'styled-components'

import { GRAY } from '../../constants/colors'
import { maxWidth, TABLET } from '../../constants/widths'

const Wrapper = s.div`
  ${maxWidth(TABLET)} {
    ${({ active }) => active ? `
      max-height: 4rem;
    ` : `
      max-height: 0;
    `}
  }
`

const Footer = s.footer`
  width: 100%;
  padding: 1rem 0;
  color: ${GRAY};
  font-size: 0.8rem;
  position: absolute;
  bottom: 0;

  ${maxWidth(TABLET)} {
    position: relative;
    padding: 1rem 0 0.5rem 0;
  }
`

export default ({ active }) => (
  <Wrapper active={active}>
    <Footer>
      Prof. Jesiel Viana &copy; {new Date().getFullYear()}
    </Footer>
  </Wrapper>
)

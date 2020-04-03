import React from 'react'
import s from 'styled-components'

import { POWER_BY_ROUTE } from '../../constants/routes'

import { GRAY } from '../../constants/colors'
import { maxWidth, TABLET } from '../../constants/widths'

const Wrapper = s.div`
  ${maxWidth(TABLET)} {
    ${({ active }) => active ? `
      // max-height: 4rem;
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
  bottom: 1rem;

  ${maxWidth(TABLET)} {
    position: relative;
    padding: 1rem 0 0 0;
    bottom: 0;
  }
`

const styles = `
  width: 100%;
  padding: 1rem 0;
  color: ${GRAY};
  font-size: 0.7rem;
  position: absolute;
  display: block;
  bottom: 0;

  ${maxWidth(TABLET)} {
    position: relative;
    padding: 0;
    display: block;
  }
`

const ExternalLink = s.a`${styles}`

export default ({ active }) => (
  <Wrapper active={active}>
    <Footer>
      Prof. Jesiel Viana &copy; {new Date().getFullYear()}
    </Footer>
    <ExternalLink href={POWER_BY_ROUTE} target="_BLANK">Power By @cameroncabo</ExternalLink>
  </Wrapper>
)

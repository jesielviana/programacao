import s from 'styled-components'
import { Link } from 'gatsby'

import { BLUE, NAVY, WHITE } from '../constants/colors'
import { maxWidth, PHONE } from '../constants/widths'

const styles = `
  border-radius: 0rem;
  padding: 0.5rem 1rem;
  background: ${BLUE};
  color: ${WHITE};
  display: inline-block;
  margin-bottom: 1rem;
  text-decoration: none;
  border-radius: 4px;

  &:visited {
    color: ${WHITE};
    text-decoration: none;
  }

  &:hover,
  &:focus,
  &:active {
    background: ${NAVY};
    color: ${WHITE};
    text-decoration: none;
  }

  ${maxWidth(PHONE)} {
    padding: 0.5rem 0.75rem;
  }
`

export const BtnAnchor = s.a`${styles}`

export const BtnLink = s(Link)`${styles}`

export const BtnInput = s.input`${styles}`

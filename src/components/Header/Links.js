import React from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'

import { maxWidth, TABLET } from '../../constants/widths'

import {
  HOME_ROUTE,
  ASSIGNMENTS_ROUTE,
  LECTURES_ROUTE,
  STAFF_ROUTE,
  PIAZZA_ROUTE,
} from '../../constants/routes'
import { GRAY, DARK_GRAY } from '../../constants/colors'

const styles = `
  width: 100%;
  color: ${GRAY};
  text-decoration: none !important;
  width: 100%;
  display: block;
  padding: 0.5rem 0;

  :visited {
    color: ${GRAY};
  }

  :active,
  :focus,
  :hover {
    color: ${DARK_GRAY};

    ::after {
      content: "→";
      float: right;
    }
  }
`

const Links = s.div`
  ${maxWidth(TABLET)} {
    ${({ active }) => active ? `
      max-height: 100vh;
    ` : `
      max-height: 0;
    `}

    a {
      display: block;
      margin: 0.5rem 0;
      font-size: 1.2rem;
    }
  }
`

const InternalLink = s(Link)`${styles}`
const ExternalLink = s.a`${styles}`

export default ({ active }) => (
  <Links active={active}>
    <InternalLink to={HOME_ROUTE}>Home</InternalLink>
    <InternalLink to={ASSIGNMENTS_ROUTE}>Assignments</InternalLink>
    <InternalLink to={LECTURES_ROUTE}>Lectures</InternalLink>
    <InternalLink to={STAFF_ROUTE}>Staff</InternalLink>
    <ExternalLink href={PIAZZA_ROUTE} target="_BLANK">Piazza</ExternalLink>
  </Links>
)

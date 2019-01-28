import React from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'

import home from '../images/home.svg'
import chevron from '../images/chevron.svg'
import { GRAY, DARK_GRAY, LIGHT_GRAY } from '../constants/colors'
import { HOME_ROUTE } from '../constants/routes'

const Breadcrumbs = s.div`
  display: inline-block;
  margin-bottom: 1.5rem;
  background: ${LIGHT_GRAY};
  padding: 0.5rem 0 0.5rem 1rem;
  border-radius: 4px;

  a {
    margin-right: 1rem;
    color: ${GRAY} !important;
    text-decoration: none;
    font-size: 0.8rem;

    :hover,
    :focus,
    :active {
      color: ${DARK_GRAY} !important;
      text-decoration: none;
    }
  }
`

const bgStyles = `
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`

const Home = s.div`
  height: 0.8rem;
  width: 0.8rem;
  display: inline-block;
  margin: 0;
  background-image: url(${home});
  ${bgStyles}
`

const Chevron = s.div`
  height: 0.8rem;
  width: 0.4rem;
  display: inline-block;
  margin: 0 1rem 0 0;
  opacity: 0.5;
  background-image: url(${chevron});
  ${bgStyles}
`

const StyledLink = s(Link)`
  text-transform: capitalize;
`

export default ({ location }) => {
  if (!location || !location.pathname) return null

  const { pathname } = location
  const paths = pathname.split('/').filter(path => path !== '')

  let absPath = ''

  return (
    <Breadcrumbs>
      <Link to={HOME_ROUTE} key={absPath}>
        <Home />
      </Link>

      {paths.map((path, idx) => {
        absPath += `/${path}`

        return (
          <span key={absPath}>
            <Chevron />
            <StyledLink to={absPath}>{path}</StyledLink>
          </span>
        )
      })}
    </Breadcrumbs>
  )
}

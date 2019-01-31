import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import s from 'styled-components'

import Header from '../components/Header'
import './layout.css'
import { BORDER, LIGHT_GRAY } from '../constants/colors'
import Breadcrumbs from '../components/Breadcrumbs'

// TODO mobile responsiveness

const Wrapper = s.div`
  width: 100%;
  display: block;
  display: flex;
`

const Content = s.div`
  flex: 1;
  padding: calc(1rem + 2.5%) calc(5% + 1rem);
  min-height: calc(100vh - 60px);
  display: block;
  box-sizing: border-box;
  position: relative;
  width: 80vw;

  hr {
    background: ${BORDER};
    height: 3px;
  }

  pre {
    max-width: 100%;
  }

  tbody tr {
    :hover {
      background: ${LIGHT_GRAY};
    }
  }
`

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Header siteTitle={data.site.siteMetadata.title} />

        <Content>
          <Breadcrumbs location={location} />

          {children}
        </Content>
      </Wrapper>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

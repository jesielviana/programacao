import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import s from 'styled-components'

import './layout.css'

import { BORDER, LIGHT_GRAY } from '../constants/colors'
import { maxWidth, TABLET } from '../constants/widths'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'

const Wrapper = s.div`
  width: 100%;
  display: flex;

  ${maxWidth(TABLET)} {
    display: block;
  }
`

const Content = s.div`
  flex: 1;
  padding: calc(1rem + 2.5%) calc(5% + 1rem);
  min-height: calc(100vh - 60px);
  display: block;
  box-sizing: border-box;
  position: relative;
  width: 80vw;

  ${maxWidth(TABLET)} {
    width: 100%;
  }

  hr {
    background: ${BORDER};
    height: 3px;
  }

  pre {
    max-width: 100%;
    background: ${LIGHT_GRAY} !important;
    margin: 0;
    margin-bottom: 1.45rem;
  }

  code {
    background: ${LIGHT_GRAY} !important;
    line-height: 1.45rem;
    padding: 0.1em 0.3em !important;

    ::before {
      content: '' !important;
    }

    ::after {
      content: '' !important;
    }
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

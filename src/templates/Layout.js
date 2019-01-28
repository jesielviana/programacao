import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import s from 'styled-components'

import Header from '../components/Header'
import './layout.css'
import { BORDER } from '../constants/colors'

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
`

const Layout = ({ children }) => (
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

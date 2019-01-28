import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import s from 'styled-components'

import Header from '../components/Header'
import './layout.css'

const Wrapper = s.div`
  width: 100%;
  display: block;
  display: flex;
`

const Content = s.div`
  flex: 1;
  padding: calc(1rem + 2.5%) calc(5% + 1rem);
  min-height: calc(100vh - 60px);
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

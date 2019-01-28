import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import s from 'styled-components'

import Header from './Header'
import './layout.css'

const Wrapper = s.div`
  width: 100%;
  display: block;
  display: flex;
`

const Content = s.div`
  flex: 1;
  padding: 0 calc(5% + 1rem);
`

const ContentSpacer = s.div`
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
          <ContentSpacer>
            {children}
          </ContentSpacer>
        </Content>
      </Wrapper>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

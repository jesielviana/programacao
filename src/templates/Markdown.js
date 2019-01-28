import React from 'react'
import { graphql } from 'gatsby'
import s from 'styled-components'

import Layout from './Layout'
import { GRAY } from '../constants/colors'

const Timestamp = s.p`
  color: ${GRAY};
  margin-bottom: 2.25rem;
`

export default function Template ({
  data, // This prop will be injected by the GraphQL query below.
  location,
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark

  const { title, date } = frontmatter

  return (
    <Layout location={location}>
      <h1>{title}</h1>
      {date && (<Timestamp>Last updated: {date}</Timestamp>)}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

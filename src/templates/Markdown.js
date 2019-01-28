import React from 'react'
import { graphql } from 'gatsby'

import Layout from './Layout'

export default function Template ({
  data, // This prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark

  const { title, date } = frontmatter

  return (
    <Layout>
      <h1>{title}</h1>
      {date && (<p>Last updated: {date}</p>)}
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

import React from 'react'
import { graphql } from 'gatsby'
import s from 'styled-components'

import SEO from '../components/seo'
import Layout from './Layout'
import Lecture from './Lecture'
import { GRAY } from '../constants/colors'

const Timestamp = s.p`
  color: ${GRAY};
  opacity: 0.8;
  margin-bottom: calc(2rem + 2.5%);
`

export default function Template ({
  data, // This prop will be injected by the GraphQL query below.
  location,
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark

  const { title, date, metaTitle } = frontmatter

  const isLecture = location.pathname.includes('lecture')

  if (isLecture) {
    return (
      <>
        <SEO title={metaTitle || title} />
        <Lecture
          location={location}
          title={title}
          date={date}
          html={html}
        />
      </>
    )
  }

  return (
    <Layout location={location}>
      <SEO title={metaTitle || title} />
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
        metaTitle
      }
    }
  }
`

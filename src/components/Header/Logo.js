import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import s from 'styled-components'

const Wrapper = s.div`
  width: 100%;
  padding-right: 50%;
  height: auto;
  margin-bottom: 1rem;
  margin-left: -7.5%;
`

export default () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Img fluid={data.placeholderImage.childImageSharp.fluid} />
      </Wrapper>
    )}
  />
)

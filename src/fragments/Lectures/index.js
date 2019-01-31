import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import AdditionalReading from './AdditionalReading'

// TOOD add due dates

export const Lectures = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___number] }
          limit: 1000
          filter: {fileAbsolutePath: {regex: "/lectures/.*\\.md$/"}}
        ) {
          edges {
            node {
              fileAbsolutePath
              frontmatter {
                path
                number
                hidden
                title
              }
            }
          }
        }
      }
    `}
    render={data => {
      const lectures = data.allMarkdownRemark.edges

      return (
        <>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>
              {lectures.map(l => {
                const {
                  node: {
                    frontmatter: {
                      title,
                      path,
                      number,
                      hidden
                    }
                  }
                } = l

                if (hidden) {
                  return null
                }

                return (
                  <tr key={path}>
                    <td>{number}</td>
                    <td><Link to={path}>{title}</Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <AdditionalReading />
        </>
      )
    }}
  />
)

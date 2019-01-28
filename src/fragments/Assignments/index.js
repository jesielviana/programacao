import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

// TOOD add due dates

export const Assignments = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title] }
          limit: 1000
          filter: {fileAbsolutePath: {regex: "/assignments/.*\\.md$/"}}
        ) {
          edges {
            node {
              fileAbsolutePath
              frontmatter {
                path
                title
              }
            }
          }
        }
      }
    `}
    render={data => {
      const assignments = data.allMarkdownRemark.edges

      return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Due date</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((a, idx) => {
              const {
                node: {
                  frontmatter: {
                    title,
                    path
                  }
                }
              } = a

              return (
                <tr key={path}>
                  <td>{idx + 1}</td>
                  <td><Link to={path}>{title}</Link></td>
                  <td>TODO</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }}
  />
)

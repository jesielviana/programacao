import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

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
                hidden
                due(formatString: "MMMM DD, YYYY")
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
                    path,
                    due,
                    hidden,
                  }
                }
              } = a

              if (hidden) {
                return null
              }

              return (
                <tr key={path}>
                  <td>{idx + 1}</td>
                  <td><Link to={path}>{title}</Link></td>
                  <td>{due ? `${due}, 11:59:59PM` : ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }}
  />
)

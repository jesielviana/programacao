import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import AdditionalReading from './AdditionalReading'

// TODO slide decks

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

        allFile(filter: {
          name: { eq: "lectureReading" }
          sourceInstanceName: { eq : "json" }
        }) {
          edges {
            node {
              childrenLectureReadingJson {
                url
                name
                lecture
              }
            }
          }
        }
      }
    `}
    render={data => {
      // When the graphql query has been fulfilled
      // Find all lectures and readings
      const lectures = data.allMarkdownRemark.edges
      const readings = data.allFile.edges[0].node.childrenLectureReadingJson

      // Find all readings for the passed in lecture number
      const renderReadings = num => {
        const filteredReadings = readings.filter(r => {
          console.log(r)
          return r.lecture === num
        })

        if (!filteredReadings || !filteredReadings.length) {
          return null
        }

        return filteredReadings.map(({ name, url }) => (
          <div key={url}>
            <a href={url}>{name}</a>
          </div>
        ))
      }

      return (
        <>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Assunto</th>
                <th>{'Leitura Obrigatória'}</th>
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
                    <td>{renderReadings(number)}</td>
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

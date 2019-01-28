import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import StaffMember from './StaffMember'
import { Row } from '../../components'

export const Staff = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile (filter: {
          name: { eq : "staff" }
          sourceInstanceName: { eq : "json" }
        }) {
          edges {
            node {
              childrenStaffJson {
                name
                role
                email
                officeHours
                image {
                  src {
                    childImageSharp {
                      fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const staff = data.allFile.edges[0].node.childrenStaffJson

      return (
        <Row margin="1rem">
          {staff.map(s => (
            <StaffMember {...s} />
          ))}
        </Row>
      )
    }}
  />
)

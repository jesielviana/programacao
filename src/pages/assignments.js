import React from 'react'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Assignments } from '../fragments'

const AssignmentsPage = ({ location }) => (
  <Layout location={location}>
    <SEO
      title="Assignments"
      description="Assignments for CIS 197: JavaScript at the University of Pennsylvania"
    />
    <h1>Assignments</h1>

    <Assignments />
  </Layout>
)

export default AssignmentsPage

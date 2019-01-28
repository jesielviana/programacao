import React from 'react'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Assignments } from '../fragments'

// TODO SEO across the board

const AssignmentsPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Assignments" />
    <h1>Assignments</h1>

    <Assignments />
  </Layout>
)

export default AssignmentsPage

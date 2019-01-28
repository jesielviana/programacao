import React from 'react'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Staff } from '../fragments'

const StaffPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Staff" />
    <h1>Course Staff</h1>
    <Staff />
  </Layout>
)

export default StaffPage

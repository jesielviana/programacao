import React from 'react'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Lectures } from '../fragments'

const LecturesPage = ({ location }) => (
  <Layout location={location}>
    <SEO
      title="Lectures"
      description="Lectures for CIS 197: JavaScript at the University of Pennsylvania"
    />
    <h1>Aulas</h1>

    <Lectures />
  </Layout>
)

export default LecturesPage

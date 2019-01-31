import React from 'react'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Lectures } from '../fragments'

// TODO SEO across the board

const LecturesPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Lectures" />
    <h1>Lectures</h1>

    <Lectures />
  </Layout>
)

export default LecturesPage

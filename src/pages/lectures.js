import React from 'react'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Lectures } from '../fragments'

const LecturesPage = ({ location }) => (
  <Layout location={location}>
    <SEO
      title="Aulas"
      description="Aulas da disciplina de Programação para Internet I"
    />
    <h1>Aulas</h1>

    <Lectures />
  </Layout>
)

export default LecturesPage

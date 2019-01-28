import React from 'react'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { BtnLink } from '../components'
import { HOME_ROUTE } from '../constants/routes'

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="404: Not found" />
    <h1>Page not found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <BtnLink to={HOME_ROUTE}>Back to home</BtnLink>
  </Layout>
)

export default NotFoundPage

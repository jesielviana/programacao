import React from 'react'
import s from 'styled-components'
import Img from 'gatsby-image'

import { LIGHT_GRAY } from '../../constants/colors'
import { Col } from '../../components'

const ImgWrapper = s.div`
  width: 100%;
  margin-bottom: 1rem;
`

const Name = s.h3`
  margin-bottom: 0.75rem;
`

const Email = s.p`
  margin-bottom: 0.5rem;
`

const Role = s.span`
  background: ${LIGHT_GRAY};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
`

export default ({
  name,
  role,
  image,
  email,
  officeHours,
}) => (
  <Col margin="1rem">
    <ImgWrapper>
      <Img fluid={image.src.childImageSharp.fluid} />
    </ImgWrapper>

    <Name>{name}</Name>
    <Role>{role}</Role>
    <br />
    <Email>
      <a href={`mailto:${email}`}>{email}</a>
    </Email>
    <p>
      <strong>Office hours:</strong>
      <br />
      {officeHours}
    </p>
  </Col>
)

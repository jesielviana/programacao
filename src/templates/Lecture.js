import React, { Component } from 'react'
import s from 'styled-components'

import { GRAY } from '../constants/colors'
import logo from '../images/logo.svg'

const LEFT_KEY_CODE = 37
const RIGHT_KEY_CODE = 39

// TOOD mobile responsiveness

const Wrapper = s.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: calc(1rem + 5%) calc(1rem + 20%);

  p {
    line-height: 1.15;
  }

  div {
    width: 100%;
  }

  .center {
    text-align: center;
  }

  .middle {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .block-text {
    h1 {
      font-size: 4rem;
    }
  }

  .x-large {
    h1 {
      font-size: 3rem;
    }

    font-size: 140%;
    line-height: 1.15;
  }

  .large {
    font-size: 120%;
    line-height: 1.15;
  }
`

const Logo = s.img`
  position: absolute;
  width: 2rem;
  height: auto;
  top: calc(1rem + 5%);
  right: calc(1rem + 5%);
`

const Navigation = s.div`
  position: absolute;
  bottom: calc(1rem + 5%);
  padding: 0 calc(1rem + 5%);
  text-align: right;
  width: 100%;

  p {
    display: inline-block;
    margin: 0;
    float: left;
  }

  a {
    margin-right: 1rem;
  }
`

const SlideCount = s.p`
  color: ${GRAY};
`

// TODO document
const parseClass = str => {
  const re = /^<p>class:.*?<\/p>/

  let trimStr = str.trim()

  try {
    const res = re.exec(`${trimStr}`)

    const pTag = res[0]
    const content = pTag.substring(pTag.indexOf(':') + 1, pTag.indexOf('</p>'))
    return {
      className: content.replace(/,/g, '').trim(),
      content: trimStr.split(re)[1]
    }
  } catch (err) {
    console.log(err)
    return {
      className: '',
      content: trimStr,
    }
  }
}

class Lecture extends Component {
  constructor (props) {
    super(props)

    const { html } = this.props
    const slides = html.split('<hr>')

    this.state = {
      slide: 0,
      displaySlide: 0,
      slides,
      hidden: false,
    }
  }

  componentDidMount () {
    this.matchStateToURL()

    document.onkeydown = event => {
      if (!event) return

      const { keyCode } = event

      console.log(this)

      if (keyCode === LEFT_KEY_CODE) {
        this.prev()
      } else if (keyCode === RIGHT_KEY_CODE) {
        this.next()
      }
    }
  }

  componentDidUpdate () {
    this.matchStateToURL()
  }

  matchStateToURL = () => {
    const { location: { hash } = { hash: '#0' } } = this.props
    const id = Number(hash.substring(1))

    const { slide } = this.state
    if (slide !== id) {
      this.setState({
        slide: id,
      })
    }
  }

  prevValid = () => {
    const { slide } = this.state
    return slide > 0
  }

  nextValid = () => {
    const { slide, slides } = this.state
    return slide < slides.length - 1
  }

  next = () => {
    const { slide } = this.state
    if (!this.nextValid()) return
    window.location.hash = slide + 1
  }

  prev = () => {
    const { slide } = this.state
    if (!this.prevValid()) return
    window.location.hash = slide - 1
  }

  render () {
    const { slides, slide } = this.state
    const html = slides[slide]
    const numSlides = slides.length

    const { className, content } = parseClass(html)

    return (
      <>
        <Logo src={logo} alt="CIS 197: JavaScript" />
        <Wrapper>
          <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Wrapper>
        <Navigation>
          <SlideCount>
            {slide}/{numSlides - 1}
          </SlideCount>
          {this.prevValid() && (
            <a onClick={this.prev}>
              Prev
            </a>
          )}
          {this.nextValid() && (
            <a onClick={this.next}>
              Next
            </a>
          )}
        </Navigation>
      </>
    )
  }
}

export default Lecture

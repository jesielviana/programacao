import React, { Component } from 'react'
import s from 'styled-components'

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

const Navigation = s.div`
  position: absolute;
  bottom: calc(1rem + 5%);

  a {
    margin-right: 1rem;
  }
`

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

// TODO change ID in URL

class Lecture extends Component {
  constructor (props) {
    super(props)

    const { html } = this.props
    const slides = html.split('<hr>')

    this.state = {
      slide: 0,
      slides,
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
    this.setState({ slide: slide + 1 })
  }

  prev = () => {
    const { slide } = this.state
    if (!this.prevValid()) return
    this.setState({ slide: slide - 1 })
  }

  render () {
    const { slides, slide } = this.state
    const html = slides[slide]

    const { className, content } = parseClass(html)

    return (
      <Wrapper>
        <div>
          <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
          <Navigation>
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
        </div>
      </Wrapper>
    )
  }
}

export default Lecture

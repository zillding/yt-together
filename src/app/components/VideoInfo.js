import React, { Component } from 'react'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
}

const imgStyle = {
  marginRight: 10
}

export default class VideoInfo extends Component {
  render() {
    const { data } = this.props
    const { snippet } = data || {}

    return (
      <div style={containerStyle}>
        <img
          style={imgStyle}
          src={snippet.thumbnails.default.url}
          alt="thumbnail"/>
        <div>{snippet.title}</div>
      </div>
    )
  }
}

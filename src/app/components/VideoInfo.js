import React, { Component } from 'react'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
}

const imgPlaceholderStyle = {
  height: 90,
  backgroundColor: 'rgba(187, 187, 187, 0.85)',
  marginRight: 10,
  position: 'relative',
  flex: '0 0 120px',
}

const imgStyle = {
  position: 'absolute'
}

export default class VideoInfo extends Component {
  render() {
    const { data } = this.props
    const { snippet } = data || {}

    return (
      <div style={containerStyle}>
        <div style={imgPlaceholderStyle}>
          <img
            style={imgStyle}
            src={snippet.thumbnails.default.url}
            alt="thumbnail"/>
        </div>
        <div>{snippet.title}</div>
      </div>
    )
  }
}

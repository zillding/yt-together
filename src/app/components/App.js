import React, { Component } from 'react'

import Layout from './Layout'

const containerStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
}

const mainStyle = {
  flex: 1,
  position: 'relative',
}

export default class App extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <div style={{padding: 10}}>
          <h2>YouTube Together!</h2>
        </div>
        <div style={mainStyle}>
          <Layout/>
        </div>
      </div>
    )
  }
}

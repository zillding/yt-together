import React, { Component } from 'react'

import TitleBar from '../containers/TitleBar'
import Layout from '../containers/Layout'

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
          <TitleBar/>
        </div>
        <div style={mainStyle}>
          <Layout/>
        </div>
      </div>
    )
  }
}

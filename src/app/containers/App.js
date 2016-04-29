import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotificationSystem from 'react-notification-system'

import { sendUsername, setNotificationSystem } from '../actions'

import TitleBar from './TitleBar'
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

class App extends Component {
  componentDidMount() {
    this.props.setNotificationSystem(this.refs.notification)
    // TODO: Get user name
    this.props.sendUsername('test')
  }

  render() {
    return (
      <div style={containerStyle}>
        <div style={{padding: 10}}>
          <TitleBar/>
        </div>
        <div style={mainStyle}>
          <Layout/>
        </div>
        <NotificationSystem ref="notification"/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    sendUsername: name => dispatch(sendUsername(name)),
    setNotificationSystem: ns => dispatch(setNotificationSystem(ns)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default C

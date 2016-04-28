import React, { Component } from 'react'
import { connect } from 'react-redux'

import Search from './Search'
import Player from './Player'
import PlayList from './PlayList'

const containerStyle = {
  display: 'flex',
  position: 'absolute',
  height: '100%',
  width: '100%',
}

const style = {
  overflowY: 'auto',
  padding: '0 5px',
  position: 'relative',
  overflowY: 'auto',
}

const playerItemStyle = Object.assign({
  flex: '0 0 content',
}, style)

const itemStyle = Object.assign({
  flex: 1,
}, style)

const Layout = ({ showSearch }) => (
  <div style={containerStyle}>
    <div style={playerItemStyle}>
      <Player/>
    </div>
    <div style={itemStyle}>
      {
        showSearch ?
          <Search/> :
          <PlayList/>
      }
    </div>
  </div>
)

const mapStateToProps = state => {
  return {
    showSearch: state.showSearch
  }
}

const C = connect(
  mapStateToProps
)(Layout)

export default C

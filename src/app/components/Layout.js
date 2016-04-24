import React, { Component } from 'react'

import Search from '../containers/Search'
import Player from '../containers/Player'
import PlayList from '../containers/PlayList'

const style = {
  display: 'flex',
  position: 'absolute',
  height: '100%',
  width: '100%',
}

const itemStyle = {
  flex: '1 0 0%',
  padding: '0 5px',
  position: 'relative',
}

export default class Layout extends Component {
  render() {
    return (
      <div style={style}>
        <div style={itemStyle}>
          <Search/>
        </div>
        <div style={itemStyle}>
          <Player/>
        </div>
        <div style={itemStyle}>
          <PlayList/>
        </div>
      </div>
    )
  }
}

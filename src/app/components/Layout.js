import React, { Component } from 'react'

import Search from '../containers/Search'
import Player from '../containers/Player'
import PlayList from '../containers/PlayList'

const style = {
  display: 'flex'
}

export default class Layout extends Component {
  render() {
    return (
      <div style={style}>
        <Search/>
        <Player/>
        <PlayList/>
      </div>
    )
  }
}

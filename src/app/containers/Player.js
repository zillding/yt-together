import React, { Component } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'

export default class Player extends Component {
  render() {
    const { currentPlayingVideoId } = this.props
    const opts = {
      playerVars: {
        autoplay: 1
      }
    }

    return (
      <div>
        <YouTube
          videoId={currentPlayingVideoId}
          opts={opts}
          onReady={e => this._player = e.target} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPlayingVideoId: state.currentPlayingVideoId
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default C

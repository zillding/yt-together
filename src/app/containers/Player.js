import React, { Component } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'

import { actions, sendAction, playNext } from '../actions'
const { PAUSE, RESUME } = actions

import PlayerControl from '../components/PlayerControl'

export default class Player extends Component {
  componentWillReceiveProps({ isPlaying }) {
    if (isPlaying) {
      this._player.playVideo()
    } else {
      this._player.pauseVideo()
    }
  }

  render() {
    const {
      isPlaying,
      currentPlayingVideoId,
      onEnd,
      onPause,
      onResume,
    } = this.props
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
          onReady={e => this._player = e.target}
          onEnd={onEnd} />
        <PlayerControl
          isPlaying={isPlaying}
          onPause={onPause}
          onResume={onResume} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isPlaying: state.isPlaying,
    currentPlayingVideoId: state.currentPlayingVideoId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEnd: () => dispatch(playNext()),
    onPause: () => dispatch(sendAction(PAUSE)),
    onResume: () => dispatch(sendAction(RESUME))
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default C

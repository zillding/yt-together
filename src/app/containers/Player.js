import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions, sendAction, playNext } from '../actions'
const { PAUSE, RESUME } = actions

import YoutubePlayer from '../components/YoutubePlayer'
import PlayerControl from '../components/PlayerControl'

export default class Player extends Component {
  render() {
    const {
      isPlaying,
      currentPlayingVideoId,
      onEnd,
      onPause,
      onResume,
    } = this.props

    return (
      <div>
        <YoutubePlayer
          videoId={currentPlayingVideoId}
          isPlaying={isPlaying}
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

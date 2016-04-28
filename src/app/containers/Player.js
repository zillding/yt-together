import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Actions, sendAction, setPlayer } from '../actions'
const { PAUSE, RESUME, PLAY_NEXT } = Actions

import YoutubePlayer from '../components/YoutubePlayer'
import PlayerControl from './PlayerControl'

class Player extends Component {
  render() {
    const {
      currentPlayingVideoId,
      isPlaying,
      setPlayer,
      onPause,
      onResume,
      onNext,
    } = this.props

    return (
      <div>
        <YoutubePlayer
          setPlayer={setPlayer}
          videoId={currentPlayingVideoId}
          isPlaying={isPlaying}
          onPause={onPause}
          onResume={onResume}
          onEnd={onNext} />
        <PlayerControl/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPlayingVideoId: state.currentPlayingVideoId,
    isPlaying: state.isPlaying,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayer: player => dispatch(setPlayer(player)),
    onPause: () => dispatch(sendAction(PAUSE)),
    onResume: () => dispatch(sendAction(RESUME)),
    onNext: () => dispatch(sendAction(PLAY_NEXT)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default C

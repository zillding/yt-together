import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Actions, sendAction, setPlayer } from '../actions'
const { PLAY_NEXT } = Actions

import YoutubePlayer from '../components/YoutubePlayer'
import PlayerControl from './PlayerControl'

class Player extends Component {
  render() {
    const {
      currentPlayingVideoId,
      isPlaying,
      setPlayer,
      onNext,
    } = this.props

    return (
      <div>
        <YoutubePlayer
          setPlayer={setPlayer}
          videoId={currentPlayingVideoId}
          isPlaying={isPlaying}
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
    onNext: () => dispatch(sendAction(PLAY_NEXT)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default C

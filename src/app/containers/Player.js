import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Actions, sendAction } from '../actions'
const { PLAY_NEXT } = Actions

import YoutubePlayer from '../components/YoutubePlayer'
import PlayerControl from './PlayerControl'

export default class Player extends Component {
  render() {
    const {
      currentPlayingVideoId,
      isPlaying,
      onNext,
    } = this.props

    return (
      <div>
        <YoutubePlayer
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
    onNext: () => dispatch(sendAction(PLAY_NEXT)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default C

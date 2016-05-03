import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setPlayer } from '../actions'

import YoutubePlayer from '../components/YoutubePlayer'
import PlayerControl from './PlayerControl'
import PlayerNotice from '../components/PlayerNotice'

class Player extends Component {
  render() {
    const {
      player,
      currentPlayingVideoId,
      isPlaying,
      setPlayer,
      onNext,
    } = this.props

    return (
      <div>
        <YoutubePlayer
          setPlayer={setPlayer}
          player={player}
          videoId={currentPlayingVideoId}
          isPlaying={isPlaying} />
        <PlayerControl/>
        <PlayerNotice/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    currentPlayingVideoId: state.currentPlayingVideoId,
    isPlaying: state.isPlaying,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayer: player => dispatch(setPlayer(player)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default C

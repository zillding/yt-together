import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNextVideoId, getPreviousVideoId } from '../utils'
import { Actions, sendAction } from '../actions'
const { PAUSE, RESUME, PLAY_NEXT, PLAY_PREVIOUS } = Actions

import {
  PauseButton,
  ResumeButton,
  PrevButton,
  NextButton,
} from '../components/PlayerControlButtons'

export default class PlayerControl extends Component {
  render() {
    const {
      playlist,
      currentPlayingVideoId,
      isPlaying,
      isSendingMap,
      onClick,
      onPause,
      onResume,
      onNext,
      onPrevious,
    } = this.props

    return (
      <div>
        {
          isPlaying ?
            <PauseButton
              isSending={isSendingMap.get('PAUSE')}
              disabled={currentPlayingVideoId ? false : true}
              onPause={onPause} /> :
            <ResumeButton
              isSending={isSendingMap.get('RESUME')}
              disabled={currentPlayingVideoId ? false : true}
              onResume={onResume} />
        }
        <PrevButton
          isSending={isSendingMap.get('PLAY_PREVIOUS')}
          disabled={playlist.size === 0 ||
            getPreviousVideoId(playlist, currentPlayingVideoId) === ''}
          onPrevious={onPrevious} />
        <NextButton
          isSending={isSendingMap.get('PLAY_NEXT')}
          disabled={playlist.size === 0 ||
            getNextVideoId(playlist, currentPlayingVideoId) === ''}
          onNext={onNext} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    currentPlayingVideoId: state.currentPlayingVideoId,
    isPlaying: state.isPlaying,
    isSendingMap: state.isSendingMap,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPause: () => dispatch(sendAction(PAUSE)),
    onResume: () => dispatch(sendAction(RESUME)),
    onNext: () => dispatch(sendAction(PLAY_NEXT)),
    onPrevious: () => dispatch(sendAction(PLAY_PREVIOUS)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerControl)

export default C

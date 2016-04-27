import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNextVideoId, getPreviousVideoId } from '../utils'
import { Actions, sendAction } from '../actions'
const { PAUSE, RESUME, PLAY_NEXT, PLAY_PREVIOUS, SYNC_TIME } = Actions

import {
  PauseButton,
  ResumeButton,
  PrevButton,
  NextButton,
  SyncButton,
} from '../components/PlayerControlButtons'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export default class PlayerControl extends Component {
  render() {
    const {
      player,
      playlist,
      currentPlayingVideoId,
      isPlaying,
      isSendingMap,
      onClick,
      onPause,
      onResume,
      onNext,
      onPrevious,
      onSync,
    } = this.props

    return (
      <div style={containerStyle}>
        <div className="ui buttons">
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
            disabled={getPreviousVideoId(playlist, currentPlayingVideoId) === ''}
            onPrevious={onPrevious} />
          <NextButton
            isSending={isSendingMap.get('PLAY_NEXT')}
            disabled={getNextVideoId(playlist, currentPlayingVideoId) === ''}
            onNext={onNext} />
        </div>
        <div>
          <SyncButton
            isSending={isSendingMap.get('SYNC_TIME')}
            disabled={currentPlayingVideoId === ''}
            onSync={() => onSync(player.getCurrentTime())} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
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
    onSync: time => dispatch(sendAction(SYNC_TIME, time)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerControl)

export default C

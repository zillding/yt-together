import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNextVideoId, getPreviousVideoId } from '../utils'
import { Actions, sendAction } from '../actions'
const { PAUSE, RESUME, PLAY_NEXT, PLAY_PREVIOUS, SYNC_TIME } = Actions

import { RowContainer } from '../components/RowLayout'
import {
  PauseButton,
  ResumeButton,
  PrevButton,
  NextButton,
  SyncButton,
} from '../components/PlayerControlButtons'

class PlayerControl extends Component {
  render() {
    const {
      player,
      playlist,
      currentPlayingVideoId,
      isPlaying,
      isSendingMap,
      onPause,
      onResume,
      onNext,
      onPrevious,
      onSync,
    } = this.props

    return (
      <RowContainer>
        <div>
          {
            isPlaying ?
              <PauseButton
                isSending={isSendingMap.get('PAUSE')}
                disabled={currentPlayingVideoId === ''}
                onPause={onPause} /> :
              <ResumeButton
                isSending={isSendingMap.get('RESUME')}
                disabled={currentPlayingVideoId === ''}
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
      </RowContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    playlist: state.roomState.get('playlist'),
    currentPlayingVideoId: state.playerState.get('videoId'),
    isPlaying: state.playerState.get('isPlaying'),
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

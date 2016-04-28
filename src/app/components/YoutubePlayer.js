import React, { Component, PropTypes } from 'react'
import YouTube from 'react-youtube'

import PlayerOverlay from './PlayerOverlay'

const height = 720
const width = 1280

const containerStyle = {
  height,
  width,
  marginBottom: 10,
  position: 'relative',
}

export default class YoutubePlayer extends Component {
  render() {
    const {
      setPlayer,
      videoId,
      onPause,
      onResume,
      onEnd,
    } = this.props

    const opts = {
      height,
      width,
      playerVars: {
        autoplay: 1
      }
    }

    return (
      <div style={containerStyle}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={e => setPlayer(e.target)}
          onPlay={onResume}
          onPause={onPause}
          onEnd={onEnd} />
        {videoId ? null : <PlayerOverlay/>}
      </div>
    )
  }
}

YoutubePlayer.propTypes = {
  setPlayer: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
}

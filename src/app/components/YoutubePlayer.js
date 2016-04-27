import React, { Component, PropTypes } from 'react'
import YouTube from 'react-youtube'

export default class YoutubePlayer extends Component {
  render() {
    const { setPlayer, videoId, onEnd } = this.props
    const opts = {
      height: '480',
      width: '853',
      playerVars: {
        autoplay: 1
      }
    }

    return (
      <div>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={e => setPlayer(e.target)}
          onEnd={onEnd} />
      </div>
    )
  }
}

YoutubePlayer.propTypes = {
  setPlayer: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired,
}

import React, { Component, PropTypes } from 'react'
import YouTube from 'react-youtube'

export default class YoutubePlayer extends Component {
  componentWillReceiveProps({ isPlaying }) {
    if (isPlaying) {
      this._player.playVideo()
    } else {
      this._player.pauseVideo()
    }
  }

  render() {
    const { videoId, isPlaying, onEnd } = this.props
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
          onReady={e => this._player = e.target}
          onEnd={onEnd} />
      </div>
    )
  }
}

YoutubePlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onEnd: PropTypes.func.isRequired,
}

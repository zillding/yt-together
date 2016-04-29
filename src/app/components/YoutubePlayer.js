import React, { Component, PropTypes } from 'react'
import debounce from 'debounce'
import YouTube from 'react-youtube'

import PlayerOverlay from './PlayerOverlay'

export default class YoutubePlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: getPlayerWidth(),
    }
  }

  componentDidMount() {
    window.onresize = debounce(this._handleResize.bind(this), 200)
  }

  _handleResize() {
    const width = getPlayerWidth()
    if (width !== this.state.width) {
      this.setState({ width })
    }
  }

  render() {
    const {
      setPlayer,
      videoId,
      onPause,
      onResume,
      onEnd,
    } = this.props
    const { width } = this.state
    const height = width === 1280 ? 720 : 480

    const containerStyle = {
      height,
      width,
      marginBottom: 10,
      position: 'relative',
    }

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

function getPlayerWidth() {
  return window.innerWidth > 1800 ? 1280 : 853
}

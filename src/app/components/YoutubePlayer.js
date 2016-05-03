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

  componentWillReceiveProps(nextProps) {
    const { player, isPlaying } = this.props

    if (!player || nextProps.isPlaying === this.props.isPlaying)
      return

    if (nextProps.isPlaying) {
      player.playVideo()
    } else {
      player.pauseVideo()
    }
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
          onReady={e => setPlayer(e.target)} />
        {videoId ? null : <PlayerOverlay/>}
      </div>
    )
  }
}

YoutubePlayer.propTypes = {
  player: PropTypes.object,
  videoId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setPlayer: PropTypes.func.isRequired,
}

function getPlayerWidth() {
  return window.innerWidth > 1800 ? 1280 : 853
}

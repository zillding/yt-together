import React, { Component, PropTypes } from 'react'

export default class PlayerControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendingCmd: false
    }
  }

  componentWillReceiveProps({ isPlaying }) {
    this.setState({ sendingCmd: false })
  }

  _handlePauseClick() {
    this.setState({ sendingCmd: true })
    this.props.onPause()
  }

  _handleResumeClick() {
    this.setState({ sendingCmd: true })
    this.props.onResume()
  }

  render() {
    const { isPlaying, onClick, onPause, onResume } = this.props

    if (isPlaying)
      return (
        <div>
          <button
            className="ui button"
            disabled={this.state.sendingCmd}
            onClick={onPause}>
            Pause
          </button>
        </div>
      )

    return (
      <div>
        <button
          className="ui button"
          disabled={this.state.sendingCmd}
          onClick={onResume}>
          Resume
        </button>
      </div>
    )
  }
}

PlayerControl.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
}

import React, { Component, PropTypes } from 'react'

export default class PlayListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelecting: false,
      isDeleting: false
    }
    this._handleDeleteClick = this._handleDeleteClick.bind(this)
    this._handlePlayClick = this._handlePlayClick.bind(this)
  }

  componentWillReceiveProps({ data, currentPlayingVideoId }) {
    if (data.id.videoId !== currentPlayingVideoId)
      this.setState({ isSelecting: false })
  }

  _handleDeleteClick() {
    const { index, onDelete } = this.props

    this.setState({ isDeleting: true })
    onDelete(index)
  }

  _handlePlayClick() {
    const { data, onSelect } = this.props

    this.setState({ isSelecting: true })
    onSelect(data.id.videoId)
  }

  render() {
    const { data, currentPlayingVideoId } = this.props
    const { snippet } = data || {}

    return (
      <div>
        <img src={snippet.thumbnails.default.url} alt="thumbnail"/>
        <h4>{snippet.title}</h4>
        {
          currentPlayingVideoId === data.id.videoId ?
            null :
            <button
              disabled={this.state.isSelecting}
              onClick={this._handlePlayClick}>
              Play
            </button>
        }
        <button
          disabled={this.state.isDeleting}
          onClick={this._handleDeleteClick}>
          Delete
        </button>
      </div>
    )
  }
}

PlayListItem.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  currentPlayingVideoId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

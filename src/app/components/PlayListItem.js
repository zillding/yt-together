import React, { Component, PropTypes } from 'react'

import { ListItem, ListItemControl } from './ListItem'
import VideoInfo from './VideoInfo'

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

    return (
      <ListItem>
        <VideoInfo data={data} />
        <ListItemControl>
          {
            currentPlayingVideoId === data.id.videoId ?
              null :
              <PlayButton
                isSelecting={this.state.isSelecting}
                onClick={this._handlePlayClick} />
          }
          <DeleteButton
            isDeleting={this.state.isDeleting}
            onClick={this._handleDeleteClick} />
        </ListItemControl>
      </ListItem>
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

const PlayButton = ({ isSelecting, onClick }) => {
  const cn = isSelecting ?
    'ui disabled icon button loading' :
    'ui icon button'
  return (
    <button
      className={cn}
      disabled={isSelecting}
      onClick={onClick}>
      <i className="play icon"></i>
    </button>
  )
}

const DeleteButton = ({ isDeleting, onClick }) => {
  const cn = isDeleting ?
    'ui disabled negative icon button loading' :
    'ui negative icon button'
  return (
    <button
      className={cn}
      disabled={isDeleting}
      style={{margin: 0}}
      onClick={onClick}>
      <i className="remove icon"></i>
    </button>
  )
}

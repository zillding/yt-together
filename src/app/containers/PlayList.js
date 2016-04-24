import React, { Component } from 'react'
import { connect } from 'react-redux'

import { play, deleteVideo } from '../actions'
import PlayListItem from '../components/PlayListItem'

class PlayList extends Component {
  render() {
    const {
      playlist,
      currentPlayingVideoId,
      onSelect,
      onDelete,
    } = this.props

    return (
      <div>
        <h4>Your Playlist</h4>
        {
          playlist.map((data, index) =>
            <PlayListItem
              key={index}
              index={index}
              data={data}
              onSelect={onSelect}
              onDelete={onDelete} />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    currentPlayingVideoId: state.currentPlayingVideoId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelect: videoId => dispatch(play(videoId)),
    onDelete: index => dispatch(deleteVideo(index))
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayList)

export default C

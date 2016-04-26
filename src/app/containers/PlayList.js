import React, { Component } from 'react'
import { connect } from 'react-redux'

import { play, Actions, sendAction } from '../actions'
const { DELETE_VIDEO, PLAY } = Actions

import PlayListItem from '../components/PlayListItem'
import { ColumnContainer, ColumnMain } from '../components/ColumnLayout'

class PlayList extends Component {
  render() {
    const {
      playlist,
      currentPlayingVideoId,
      onSelect,
      onDelete,
    } = this.props

    return (
      <ColumnContainer>
        <h4>Your Playlist</h4>
        <ColumnMain>
          {
            playlist.map((data, index) =>
              <PlayListItem
                key={data.id.videoId}
                index={index}
                data={data}
                currentPlayingVideoId={currentPlayingVideoId}
                onSelect={onSelect}
                onDelete={onDelete} />
            )
          }
        </ColumnMain>
      </ColumnContainer>
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
    onSelect: videoId => dispatch(sendAction(PLAY, videoId)),
    onDelete: index => dispatch(sendAction(DELETE_VIDEO, index))
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayList)

export default C

import { Component } from 'react'
import { connect } from 'react-redux'

import { sendAction } from 'actions'

import { ColumnContainer, ColumnMain } from 'components/ColumnLayout'
import Message from './components/Message'
import PlaylistItem from './components/PlaylistItem'

class Playlist extends Component {
  render() {
    const {
      playlist,
      currentPlayingVideoId,
      onSelect,
      onDelete,
    } = this.props

    return (
      <ColumnContainer>
        <h4>Playlist</h4>
        <ColumnMain>
          {
            playlist.size === 0 ?
              <Message/> :
              playlist.map((data, index) =>
                <PlaylistItem
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
    playlist: state.roomState.get('playlist'),
    currentPlayingVideoId: state.playerState.get('videoId'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelect: videoId => dispatch(sendAction('PLAY', videoId)),
    onDelete: index => dispatch(sendAction('DELETE_VIDEO', index)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)

export default C

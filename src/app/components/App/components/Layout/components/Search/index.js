import { Component } from 'react'
import { connect } from 'react-redux'

import { search, sendAction } from 'actions'
import { getVideoIndex } from 'utils'

import { ColumnContainer, ColumnMain } from 'components/ColumnLayout'
import SearchInput from './components/SearchInput'
import SearchResult from './components/SearchResult'

class Search extends Component {
  render() {
    const {
      isSearching,
      searchResult,
      searchError,
      playlist,
      isConnected,
      onSearch,
      onAdd,
    } = this.props

    return (
      <ColumnContainer>
        <SearchInput
          isSearching={isSearching}
          onSearch={onSearch} />
        <ColumnMain>
          <SearchResult
            data={searchResult}
            getIsInPlaylist={videoId => getVideoIndex(playlist, videoId) !== -1}
            isConnected={isConnected}
            onAdd={onAdd} />
        </ColumnMain>
      </ColumnContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSearching: state.isSearching,
    searchResult: state.searchResult,
    searchError: state.searchError,
    playlist: state.roomState.get('playlist'),
    isConnected: state.isConnected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearch: text => dispatch(search(text)),
    onAdd: data => dispatch(sendAction('ADD_VIDEO', data))
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default C

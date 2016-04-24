import React, { Component } from 'react'
import { connect } from 'react-redux'

import { search, addVideo } from '../actions'
import SearchInput from '../components/SearchInput'
import SearchResult from '../components/SearchResult'

class Search extends Component {
  render() {
    const {
      isSearching,
      searchResult,
      searchError,
      playlist,
      onSearch,
      onAdd,
    } = this.props

    return (
      <div>
        <SearchInput onSearch={onSearch} />
        <SearchResult
          playlist={playlist}
          data={searchResult}
          onAdd={onAdd} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSearching: state.isSearching,
    searchResult: state.searchResult,
    searchError: state.searchError,
    playlist: state.playlist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearch: text => dispatch(search(text)),
    onAdd: data => dispatch(addVideo(data))
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default C

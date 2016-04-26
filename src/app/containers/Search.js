import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Actions, search, sendAction } from '../actions'
const { ADD_VIDEO } = Actions

import SearchInput from '../components/SearchInput'
import SearchResult from '../components/SearchResult'
import { ColumnContainer, ColumnMain } from '../components/ColumnLayout'

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
      <ColumnContainer>
        <SearchInput
          isSearching={isSearching}
          onSearch={onSearch} />
        <ColumnMain>
          <SearchResult
            playlist={playlist}
            data={searchResult}
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
    playlist: state.playlist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearch: text => dispatch(search(text)),
    onAdd: data => dispatch(sendAction(ADD_VIDEO, data))
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default C

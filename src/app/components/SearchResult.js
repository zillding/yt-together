import React, { Component, PropTypes } from 'react'

import SearchResultItem from './SearchResultItem'

export default class SearchResult extends Component {
  render() {
    const { playlist, data, isAddingVideo, onAdd } = this.props

    return (
      <div>
        {
          data.map((o, index) =>
            <SearchResultItem
              key={index}
              playlist={playlist}
              data={o}
              onAdd={onAdd} />
          )
        }
      </div>
    )
  }
}

SearchResult.propTypes = {
  playlist: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired
}

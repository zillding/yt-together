import { Component, PropTypes } from 'react'

import SearchResultItem from './components/SearchResultItem'

export default class SearchResult extends Component {
  render() {
    const { data, getIsInPlaylist, onAdd } = this.props

    return (
      <div>
        {
          data.map((o, index) =>
            <SearchResultItem
              key={index}
              data={o}
              isInPlaylist={getIsInPlaylist(o.id.videoId)}
              onAdd={onAdd} />
          )
        }
      </div>
    )
  }
}

SearchResult.propTypes = {
  data: PropTypes.array.isRequired,
  getIsInPlaylist: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

import React, { Component, PropTypes } from 'react'

export default class PlayListItem extends Component {
  render() {
    const {
      index,
      data,
      onSelect,
      onDelete
    } = this.props
    const { snippet } = data || {}

    return (
      <div>
        <img src={snippet.thumbnails.default.url} alt="thumbnail"/>
        <h4>{snippet.title}</h4>
        <button onClick={() => onSelect(data.id.videoId)}>Play</button>
        <button onClick={() => onDelete(index)}>Delete</button>
      </div>
    )
  }
}

PlayListItem.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

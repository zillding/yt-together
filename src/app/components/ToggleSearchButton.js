import React from 'react'

const ToggleSearchButton = ({ showSearch, onClick }) => {
  if (showSearch) {
    return (
      <button
        className="ui basic button"
        onClick={onClick}>
        <i className="list icon"></i>
        Show Playlist
      </button>
    )
  }

  return (
    <button
      className="ui basic button"
      onClick={onClick}>
      <i className="search icon"></i>
      Search Videos
    </button>
  )
}

export default ToggleSearchButton

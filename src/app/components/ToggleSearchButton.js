import React from 'react'

const buttonStyle = {
  margin: 0
}

const ToggleSearchButton = ({ showSearch, onClick }) => {
  if (showSearch) {
    return (
      <button
        className="ui secondary button"
        style={buttonStyle}
        onClick={onClick}>
        <i className="list icon"></i>
        Show Playlist
      </button>
    )
  }

  return (
    <button
      className="ui primary button"
      style={buttonStyle}
      onClick={onClick}>
      <i className="search icon"></i>
      Search Videos
    </button>
  )
}

export default ToggleSearchButton

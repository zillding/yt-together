import React from 'react'

const ToggleSearchButton = ({ showSearch, onClick }) => {
  if (showSearch) {
    return (
      <button
        className="ui basic button"
        onClick={onClick}>
        <i className="remove icon"></i>
        Done Searching
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

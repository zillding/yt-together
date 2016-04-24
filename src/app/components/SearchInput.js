import React, { Component, PropTypes } from 'react'

export default class SearchInput extends Component {
  constructor(props) {
    super(props)
    this._handleEnter = this._handleEnter.bind(this)
  }

  _handleEnter(e) {
    if (e.key === 'Enter') {
      const text = this.refs.input.value.trim()
      if (text) {
        this.props.onSearch(text)
      }
    }
  }

  render() {
    return (
      <input
        ref="input"
        type="text"
        onKeyPress={this._handleEnter}
        placeholder="Press enter to search..." />
    )
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
}

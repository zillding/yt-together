import { Component, PropTypes } from 'react'

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
    const { isSearching } = this.props
    const cn = `ui fluid left icon input${isSearching ? ' loading' : ''}`

    return (
      <div className={cn}>
        <input
          ref="input"
          type="text"
          onKeyPress={this._handleEnter}
          placeholder="Press enter to search..." />
        <i className="search icon"></i>
      </div>
    )
  }
}

SearchInput.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
}

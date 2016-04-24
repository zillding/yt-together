import React, { Component, PropTypes } from 'react'
import YouTube from 'react-youtube'

import { getVideoIndex } from '../utils'

export default class SearchResultItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peeking: false,
      isAdding: false
    }
    this._handleTogglePeek = this._handleTogglePeek.bind(this)
    this._handleAdd = this._handleAdd.bind(this)
  }

  componentWillReceiveProps({ playlist, data }) {
    if (getVideoIndex(playlist, data.id.videoId) === -1)
      this.setState({ isAdding: false })
  }

  _handleTogglePeek() {
    this.setState({
      peeking: !this.state.peeking
    })
  }

  _handleAdd() {
    const { data, onAdd } = this.props

    this.setState({ isAdding: true })
    onAdd(data)
  }

  render() {
    const { playlist, data } = this.props
    const { peeking } = this.state

    return (
      <div>
        <Item
          peeking={peeking}
          data={this.props.data} />
        <button onClick={this._handleTogglePeek}>
          { peeking ? 'Done' : 'Peek' }
        </button>
        {
          getVideoIndex(playlist, data.id.videoId) !== -1 ?
            <span>Added</span> :
            <button
              disabled={this.state.isAdding}
              onClick={this._handleAdd}>
              Add
            </button>
        }
      </div>
    )
  }
}

SearchResultItem.propTypes = {
  playlist: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired
}

const Item = ({ peeking, data }) => {
  if (peeking) {
    const { id: { videoId } } = data
    const opts = {
      playerVars: {
        autoplay: 1
      }
    }
    return (
      <div><div>
        <YouTube
          videoId={videoId}
          opts={opts} />
      </div></div>
    )
  }

  const { snippet } = data || {}
  return (
    <div>
      <img src={snippet.thumbnails.default.url} alt="thumbnail"/>
      <h4>{snippet.title}</h4>
    </div>
  )
}

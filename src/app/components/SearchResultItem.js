import { Component, PropTypes } from 'react'
import YouTube from 'react-youtube'

import { getVideoIndex } from '../utils'

import { ListItem, ListItemControl } from './ListItem'
import VideoInfo from './VideoInfo'

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
      <ListItem>
        <Item
          peeking={peeking}
          data={this.props.data} />
        <ListItemControl>
          <PeekButton
            peeking={peeking}
            onClick={this._handleTogglePeek} />
          {
            getVideoIndex(playlist, data.id.videoId) !== -1 ?
              <AddLabel/> :
              <AddButton
                isAdding={this.state.isAdding}
                onClick={this._handleAdd} />
          }
        </ListItemControl>
      </ListItem>
    )
  }
}

SearchResultItem.propTypes = {
  playlist: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired
}

const PeekButton = ({ peeking, onClick }) => {
  const iconCn = peeking ? 'remove icon' : 'film icon'
  return (
    <button
      className="ui icon button"
      onClick={onClick}>
      <i className={iconCn}></i>
    </button>
  )
}

const AddButton = ({ isAdding, onClick }) => {
  const cn = isAdding ?
    'ui positive disabled loading icon button' :
    'ui positive icon button'

  return (
    <button
      className={cn}
      disabled={isAdding}
      onClick={onClick}>
      <i className="plus icon"></i>
    </button>
  )
}

const AddLabel = () => (
  <button
    className="ui disabled green basic icon button"
    disabled={true}>
    <i className="checkmark icon"></i>
  </button>
)

const Item = ({ peeking, data }) => {
  if (peeking) {
    const { id: { videoId } } = data
    const opts = {
      height: '240',
      width: '400',
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

  return <VideoInfo data={data} />
}

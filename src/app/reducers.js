import { List } from 'immutable'
import io from 'socket.io-client'

import { actions } from './actions'
const {
  ADD_VIDEO,
  DELETE_VIDEO,
  PLAY,
  PAUSE,
  RESUME,
} = actions

export function socket(state = null, action) {
  switch (action.type) {
    case 'SET_SOCKET':
      return action.socket
    default:
      return state
  }
}

export function isSearching(state = false, action) {
  switch (action.type) {
    case 'SEARCH':
      return true
    case 'SET_SEARCH_RESULT':
      return false
    case 'SET_SEARCH_ERROR':
      return false
    default:
      return state
  }
}

export function searchResult(state = [], action) {
  switch (action.type) {
    case 'SET_SEARCH_RESULT':
      return action.data
    default:
      return state
  }
}

export function searchError(state = null, action) {
  switch (action.type) {
    case 'SET_SEARCH_ERROR':
      return action.error
    default:
      return state
  }
}

export function isAddingVideo(state = false, action) {
  switch (action.type) {
    case `SEND_${ADD_VIDEO}`:
      return true
    case ADD_VIDEO:
      return false
    default:
      return state
  }
}

export function isDeletingVideo(state = false, action) {
  switch (action.type) {
    case `SEND_${DELETE_VIDEO}`:
      return true
    case DELETE_VIDEO:
      return false
    default:
      return state
  }
}

export function isSelectingVideo(state = false, action) {
  switch (action.type) {
    case `SEND_${PLAY}`:
      return true
    case PLAY:
      return false
    default:
      return state
  }
}

export function playlist(state = List(), action) {
  switch (action.type) {
    case ADD_VIDEO:
      return state.push(action.data)
    case DELETE_VIDEO:
      return state.delete(action.index)
    default:
      return state
  }
}

export function currentPlayingVideoId(state = '', action) {
  switch (action.type) {
    case PLAY:
      return action.videoId
    default:
      return state
  }
}

export function isPlaying(state = false, action) {
  switch (action.type) {
    case PLAY:
      if (action.videoId) return true
      return false
    case PAUSE:
      return false
    case RESUME:
      return true
    default:
      return state
  }
}

import { stringify } from 'qs'
import io from 'socket.io-client'

import { SEARCH_API, API_KEY, ACTIONS } from '../config'
import { getVideoIndex, getNextVideoId, getPreviousVideoId } from './utils'

export const Actions = ACTIONS
const {
  SET_PLAYLIST,
  ADD_VIDEO,
  DELETE_VIDEO,
  PLAY,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  PAUSE,
  RESUME,
} = Actions

export function search(text) {
  return dispatch => {
    dispatch({ type: 'SEARCH' })

    const searchParams = {
      part: 'snippet',
      key: API_KEY,
      q: text,
      type: 'video',
      maxResults: 30
    }
    const url = `${SEARCH_API}?${stringify(searchParams)}`

    fetch(url, {
      mode: 'cors'
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      throw res
    })
    .then(data => dispatch(setSearchResult(data.items)))
    .catch(err => dispatch(setSearchError(err)))
  }
}

function setSearchResult(data) {
  return { type: 'SET_SEARCH_RESULT', data }
}

function setSearchError(error) {
  return { type: 'SET_SEARCH_ERROR', error}
}

export function setUpSocket() {
  return (dispatch, getState) => {
    const socket = io()
    socket.on('action', msg => {
      switch (msg.type) {
        case SET_PLAYLIST:
          return dispatch(setPlaylist(msg.data))
        case ADD_VIDEO:
          return dispatch(addVideo(msg.data))
        case DELETE_VIDEO:
          return dispatch(deleteVideo(msg.data))
        case PLAY:
          return dispatch(play(msg.data))
        case PLAY_NEXT:
          return dispatch(playNext())
        case PLAY_PREVIOUS:
          return dispatch(playPrevious())
        case PAUSE:
          return dispatch(pause())
        case RESUME:
          return dispatch(resume())
        default:
          return
      }
    })
    dispatch({ type: 'SET_SOCKET', socket })
  }
}

export function sendAction(action, data) {
  return (dispatch, getState) => {
    dispatch({ type: `SEND_${action}` })

    const { socket } = getState()
    socket.emit('action', { type: action, data })
  }
}

function setPlaylist(data) {
  return { type: SET_PLAYLIST, data }
}

function addVideo(data) {
  return (dispatch, getState) => {
    dispatch({ type: ADD_VIDEO, data })

    const { playlist, currentPlayingVideoId } = getState()
    if (playlist.size === 1) {
      const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)
      dispatch(sendAction(PLAY, nextVideoId))
    }
  }
}

function deleteVideo(index) {
  return (dispatch, getState) => {
    const { playlist, currentPlayingVideoId } = getState()
    const currentVideoIndex = getVideoIndex(playlist, currentPlayingVideoId)
    const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)

    dispatch({ type: DELETE_VIDEO, index })

    if (currentVideoIndex === index) {
      dispatch(sendAction(PLAY, nextVideoId))
    }
  }
}

function play(videoId) {
  return { type: PLAY, videoId }
}

function pause() {
  return { type: PAUSE }
}

function resume() {
  return { type: RESUME }
}

function playNext() {
  return (dispatch, getState) => {
    const { playlist, currentPlayingVideoId } = getState()
    const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)
    dispatch({ type: PLAY_NEXT, nextVideoId })
  }
}

function playPrevious() {
  return (dispatch, getState) => {
    const { playlist, currentPlayingVideoId } = getState()
    const previousVideoId = getPreviousVideoId(playlist, currentPlayingVideoId)
    dispatch({ type: PLAY_PREVIOUS, previousVideoId })
  }
}

export function toggleSearch() {
  return { type: 'TOGGLE_SEARCH' }
}

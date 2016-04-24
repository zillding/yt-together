import { stringify } from 'qs'
import io from 'socket.io-client'

import { SEARCH_API, API_KEY } from './config'
import { getVideoIndex, getNextVideoId } from './utils'

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

export const actions = {
  ADD_VIDEO: 'ADD_VIDEO',
  DELETE_VIDEO: 'DELETE_VIDEO',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
}

export function setUpSocket() {
  return (dispatch, getState) => {
    const socket = io()
    socket.on('action', msg => {
      switch (msg.type) {
        case actions.ADD_VIDEO:
          return dispatch(addVideo(msg.data))
        case actions.DELETE_VIDEO:
          return dispatch(deleteVideo(msg.data))
        case actions.PLAY:
          return dispatch(play(msg.data))
        case actions.PAUSE:
          return dispatch(pause())
        case actions.RESUME:
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

function addVideo(data) {
  return (dispatch, getState) => {
    dispatch({ type: actions.ADD_VIDEO, data })

    const { playlist, currentPlayingVideoId } = getState()
    if (playlist.size === 1) {
      const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)
      dispatch(play(nextVideoId))
    }
  }
}

function deleteVideo(index) {
  return (dispatch, getState) => {
    const { playlist, currentPlayingVideoId } = getState()
    const currentVideoIndex = getVideoIndex(playlist, currentPlayingVideoId)
    const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)

    dispatch({ type: actions.DELETE_VIDEO, index })

    if (currentVideoIndex === index) {
      dispatch(play(nextVideoId))
    }
  }
}

function play(videoId) {
  return { type: actions.PLAY, videoId }
}

function pause() {
  return { type: actions.PAUSE }
}

function resume() {
  return { type: actions.RESUME }
}

export function playNext() {
  return (dispatch, getState) => {
    const { playlist, currentPlayingVideoId } = getState()
    const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)
    dispatch(sendAction(actions.PLAY, nextVideoId))
  }
}

import { stringify } from 'qs'
import io from 'socket.io-client'

import { SEARCH_API, API_KEY, ACTIONS, EVENTS } from '../config'
import { getVideoIndex, getNextVideoId, getPreviousVideoId } from './utils'

export const Actions = ACTIONS
const {
  SET_USER_NUMBER,
  SET_PLAYLIST,
  ADD_VIDEO,
  DELETE_VIDEO,
  PLAY,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  PAUSE,
  RESUME,
  SYNC_TIME,
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
  return dispatch => {
    const socket = io()
    dispatch({ type: 'SET_SOCKET', socket })

    socket.on(EVENTS.ACTION, msg => {
      dispatch(notify({
        message: `Action performed: ${msg.type}`,
        level: 'info',
      }))

      switch (msg.type) {
        case SET_USER_NUMBER:
          return dispatch(setUserNumber(msg.data))
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
        case SYNC_TIME:
          return dispatch(syncTime(msg.data))
        default:
          return
      }
    })

    socket.on(EVENTS.NEW_USER, msg => {
      dispatch({ type: 'INCREMENT_USER_NUMBER' })
      dispatch(notify({
        message: `User: ${msg} just joined!`,
        level: 'success',
      }))
    })
    socket.on(EVENTS.LOST_USER, msg => {
      dispatch({ type: 'DECREMENT_USER_NUMBER' })
      dispatch(notify({
        message: `User: ${msg} has left.`,
        level: 'warning',
      }))
    })
  }
}

function setUserNumber(numberOfUsers) {
  const number = numberOfUsers < 0 ? 0 : numberOfUsers
  return { type: SET_USER_NUMBER, number }
}

export function sendUsername(username) {
  return (dispatch, getState) => {
    const { socket } = getState()
    socket.emit(EVENTS.NEW_USER, username)
  }
}

export function sendAction(action, data) {
  return (dispatch, getState) => {
    dispatch({ type: `SEND_${action}` })

    const { socket } = getState()
    socket.emit(EVENTS.ACTION, { type: action, data })
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
  return (dispatch, getState) => {
    dispatch({ type: PAUSE })

    const { player } = getState()
    player.pauseVideo()
  }
}

function resume() {
  return (dispatch, getState) => {
    dispatch({ type: RESUME })

    const { player } = getState()
    player.playVideo()
  }
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

function syncTime(time) {
  return (dispatch, getState) => {
    const { player } = getState()
    player.seekTo(time)

    dispatch({ type: SYNC_TIME })
  }
}

export function setPlayer(player) {
  return { type: 'SET_PLAYER', player }
}

export function toggleSearch() {
  return { type: 'TOGGLE_SEARCH' }
}

export function setNotificationSystem(ns) {
  return { type: 'SET_NOTIFICATION_SYSTEM', ns }
}

function notify(msg) {
  return (dispatch, getState) => {
    const { notificationSystem } = getState()
    const notification = Object.assign({
      position: 'br'
    }, msg)
    notificationSystem.addNotification(notification)
  }
}

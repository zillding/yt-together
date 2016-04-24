import { stringify } from 'qs'

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

export function addVideo(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_VIDEO', data })

    const { playlist, currentPlayingVideoId } = getState()
    if (playlist.size === 1) {
      const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)
      dispatch(play(nextVideoId))
    }
  }
}

export function deleteVideo(index) {
  return (dispatch, getState) => {
    const { playlist, currentPlayingVideoId } = getState()
    const currentVideoIndex = getVideoIndex(playlist, currentPlayingVideoId)
    const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)

    dispatch({ type: 'DELETE_VIDEO', index })

    if (currentVideoIndex === index) {
      dispatch(play(nextVideoId))
    }
  }
}

export function play(videoId) {
  return { type: 'PLAY', videoId }
}

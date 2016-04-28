import express from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'
import { List } from 'immutable'

import { ACTIONS } from './config'
const {
  SET_PLAYLIST,
  ADD_VIDEO,
  DELETE_VIDEO,
  PLAY,
} = ACTIONS

//////////////////////////////////////////////
// Global state data
let playlist = List()
let currentPlayingVideoId = ''
//////////////////////////////////////////////

const app = express()
const http = Server(app)
const io = SocketIO(http)

io.on('connection', socket => {
  socket.emit('action', {
    type: SET_PLAYLIST,
    data: playlist.toArray()
  })

  if (currentPlayingVideoId) {
    socket.emit('action', {
      type: PLAY,
      data: currentPlayingVideoId
    })
  }

  socket.on('action', msg => {
    io.emit('action', msg)

    // store on server
    switch (msg.type) {
      case ADD_VIDEO:
        return playlist = playlist.push(msg.data)
      case DELETE_VIDEO:
        return playlist = playlist.delete(msg.data)
      case PLAY:
        return currentPlayingVideoId = msg.data
      default:
        return
    }
  })
  socket.on('disconnect', () => {
    // clean up playlist
    if (io.engine.clientsCount === 0) {
      playlist = playlist.clear()
      currentPlayingVideoId = ''
    }
  })
})

http.listen(3000, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})

export default app

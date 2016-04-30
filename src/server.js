import express from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'
import { List } from 'immutable'
import md5 from 'md5'

import { ACTIONS, EVENTS } from './config'
const {
  SET_USER_NUMBER,
  SET_PLAYLIST,
  ADD_VIDEO,
  DELETE_VIDEO,
  PLAY,
  PAUSE,
  RESUME,
} = ACTIONS

//////////////////////////////////////////////
// Global state data
let playlist = List()
let currentPlayingVideoId = ''
const rooms = {
  defaultRoom: {
    playlist: List(),
    currentPlayingVideoId: '',
    numberOfUsers: 0,
  },
  secretRoom: {
    playlist: List(),
    currentPlayingVideoId: '',
    numberOfUsers: 0,
  }
}

// mutate the global state
function updateData(room, field, data) {
  rooms[room][field] = data
}
//////////////////////////////////////////////

const app = express()
const http = Server(app)
const io = SocketIO(http)

io.on('connection', socket => {
  let room = 'defaultRoom'
  let username = 'Super-Bat-Iron-Spider-Man'

  socket.on(EVENTS.NEW_USER, name => {
    username = name.trim() || username

    if (md5(username) === 'e4c597f5239ff721e24e1e0b1e78307a') {
      room = 'secretRoom'
    }

    socket.join(room)

    // notify users in the room
    socket.emit(EVENTS.WELCOME, room)
    socket.broadcast.to(room).emit(EVENTS.NEW_USER, username)

    const field = 'numberOfUsers'
    updateData(room, field, rooms[room][field] + 1)

    // send initial data
    const { playlist, currentPlayingVideoId, numberOfUsers } = rooms[room]
    socket.emit(EVENTS.ACTION, {
      type: SET_USER_NUMBER,
      data: numberOfUsers
    })
    socket.emit(EVENTS.ACTION, {
      type: SET_PLAYLIST,
      data: playlist.toArray()
    })
    socket.emit(EVENTS.ACTION, {
      type: PLAY,
      data: currentPlayingVideoId
    })
  })

  socket.on(EVENTS.ACTION, msg => {
    // prevent PAUSE and RESUME events fired twice at client
    // side
    if (msg.type === PAUSE || msg.type === RESUME) {
      socket.broadcast.to(room).emit(EVENTS.ACTION, msg)
    } else {
      io.in(room).emit(EVENTS.ACTION, msg)
    }

    // store on server
    let field = 'playlist'
    switch (msg.type) {
      case ADD_VIDEO:
        return updateData(room, field, rooms[room][field].push(msg.data))
      case DELETE_VIDEO:
        return updateData(room, field, rooms[room][field].delete(msg.data))
      case PLAY:
        field = 'currentPlayingVideoId'
        return updateData(room, field, msg.data)
      default:
        return
    }
  })

  socket.on('disconnect', () => {
    const field = 'numberOfUsers'
    updateData(room, field, rooms[room][field] - 1)

    io.in(room).emit(EVENTS.LOST_USER, username)

    // clean up data
    if (rooms[room][field] === 0) {
      updateData(room, 'playlist', List())
      updateData(room, 'currentPlayingVideoId', '')
    }
  })
})

const PORT = 3000
http.listen(PORT, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening on port: ${PORT}`)
})

export default app

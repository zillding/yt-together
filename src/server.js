import express from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'

const app = express()
const http = Server(app)
const io = SocketIO(http)

io.on('connection', socket => {
  socket.on('action', msg => {
    console.log(msg)
    io.emit('action', msg)
  })
  socket.on('disconnect', () => {
    // TODO: clean up playlist
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

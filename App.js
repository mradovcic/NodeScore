import http from 'http'
import express from 'express'
import io from 'socket.io'
import * as path from 'path'
import socketHandler from './src/controls'

const PORT = 1234

const app = express()
const server = http.createServer(app)
const SocketIO = io(server)
SocketIO.origins('*:*')
SocketIO.on('connection', socketHandler)

app.use('/', express.static(path.join(__dirname, 'static/board')))
app.use('/control', express.static(path.join(__dirname, 'static/control')))

server.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
})
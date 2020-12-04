
var https = require('https');
var http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const options = {
  key: fs.readFileSync('./cert/localhost.key'),
  cert: fs.readFileSync('./cert/localhost.cert')
};

var serv = https.createServer(options, app).listen(3000);
const io = require('socket.io')(serv);

const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
  console.log("getting new connection: " + "uuid " + req.params.room);
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log(" conecting: " + "user id " + userId);
    console.log(" conecting: " + "room id " + roomId);
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      console.log("disconnecting:" + "room id " + roomId);
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})
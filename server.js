const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static files
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', (socket) => {
  //   Welcome current user
  socket.emit('message', 'Welcome to chatCord!');

  //   To clients connecting
  socket.broadcast.emit('message', 'A user has joinded the chat');

  socket.on('disconnect', () => {
    //   To general clients
    io.emit('message', 'A user has left the chat');
  });

  //   Listen for Chat message
  socket.on('chatMessage', (message) => {
    io.emit('message', message);
  });
});

let PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`SERVER RUNNING ON http://localhost:${PORT}`));

const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const formatMessage = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const chatBot = 'Chat Bot';

// Set Static files
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', (socket) => {
  socket.on('username', (username) => {
    console.log(username.username);
  });
  //   Welcome current user
  socket.emit('message', formatMessage(chatBot, 'Welcome to chatCord!'));

  //   To clients connecting
  socket.broadcast.emit('message', formatMessage(chatBot, 'A user has joinded the chat'));

  socket.on('disconnect', () => {
    //   To general clients
    io.emit('message', formatMessage(chatBot, 'A user has left the chat'));
  });

  //   Listen for Chat message
  socket.on('chatMessage', (message) => {
    io.emit('message', formatMessage('USER', message));
  });
});

let PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`SERVER RUNNING ON http://localhost:${PORT}`));

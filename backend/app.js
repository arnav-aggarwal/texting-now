// app.js
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' }});

app.use(cors());
app.use(express.json());

let previousMessages = [];

io.on('connection', (socket) => {
  socket.emit('previous messages', previousMessages);

  socket.on('message', (msg) => {
    previousMessages.push(msg);
    if(previousMessages.length >= 10) {
      previousMessages = previousMessages.slice(1);
    }
    io.emit('chat message', msg);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

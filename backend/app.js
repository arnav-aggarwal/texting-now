// app.js
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' }});

app.use(cors());
app.use(express.json());

const users = new Set();

io.on('connection', (socket) => {
  let userName = null;

  socket.on('user joined', (name) => {
    userName = name;
    users.add(name);
    io.emit('server message', {
      text: `${name} joined the chat.`,
      sender: 'System',
      color: '#888',
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  socket.on('client message', (msg) => {
    io.emit('server message', msg);
  });

  socket.on('disconnect', () => {
    if (userName) {
      users.delete(userName);
      io.emit('server message', {
        text: `${userName} disconnected.`,
        sender: 'System',
        color: '#888',
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

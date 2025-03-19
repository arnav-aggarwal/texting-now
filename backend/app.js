const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' }});

app.use(cors());
app.use(express.json());

let previousMessages = [];

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('previous messages', previousMessages);

  socket.on('test_message', (msg) => {
    console.log('Received:', msg);
  });

  socket.on('message', (msg) => {
    console.log('svr: message:', msg);
    previousMessages.push(msg);
    if(previousMessages.length >= 10) {
      previousMessages = previousMessages.slice(0, 9);
    }
    io.emit('chat message', msg);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

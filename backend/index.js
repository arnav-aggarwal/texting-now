// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io');

const allowedOrigins = [
  'http://10.0.0.96:5173',                         // local dev
  'http://localhost:5173',                         // local dev
  'http://10.0.0.96:4173',                         // local production build
  'http://localhost:4173',                         // local production build
  'https://voice-drop.vercel.app'                  // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin: ' + origin));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

const io = socketIO(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Socket.IO CORS not allowed: ' + origin));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

const users = new Set();

io.on('connection', (socket) => {
  console.log('🟢 New socket connected');

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
    console.log('🔴 Socket disconnected');

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

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

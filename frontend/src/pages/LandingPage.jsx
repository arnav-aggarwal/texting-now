import React, { useEffect, useState } from 'react';
import AudioRecorder from '../components/AudioRecorder';
import ChatLog from '../components/ChatLog';
import { io } from 'socket.io-client';

function LandingPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    socket.emit('test_message', 'Hello server!');
    socket.emit('message', `${new Date().toLocaleTimeString()}: New user joined`);
    socket.on('previous messages', messages => {
      setMessages(messages);
    });
    socket.on('chat message', msg => {
      setMessages(oldMessages => [...oldMessages, msg]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '6em' }}>
        <h1>
          Chat Log
        </h1>
        <ChatLog messages={messages}/>
      </div>
      <div>
        <h3>Audio Recorder</h3>
        <AudioRecorder />
      </div>
    </div>
  );
}

export default LandingPage;

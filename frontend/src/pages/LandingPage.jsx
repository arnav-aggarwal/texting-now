import React, { useEffect, useState } from 'react';
import useStore from '../components/store';
import AudioRecorder from '../components/AudioRecorder';
import MessageBox from '../components/MessageBox';
import ChatLog from '../components/ChatLog';
import { io } from 'socket.io-client';

function LandingPage() {
  const setMessages = useStore(state => state.setMessages);
  const socket = useStore(state => state.socket);
  const setSocket = useStore(state => state.setSocket);

  useEffect(() => {
    if(!socket) {
      setSocket(io('http://localhost:4000'));
      return;
    }

    socket.emit('message', `${new Date().toLocaleTimeString()}: New user joined`);

    socket.on('previous messages', messages => {
      setMessages(messages);
    });

    socket.on('chat message', msg => {
      setMessages(msg);
    });

    return () => socket.disconnect();
  }, [socket]);

  return (
    <div>
      <div style={{ marginBottom: '6em' }}>
        <h1>
          Chat Log
        </h1>
        <ChatLog />
      </div>
      <div>
        <h3>Audio Recorder</h3>
        <AudioRecorder />
      </div>
      <div>
        <h3>Message Box</h3>
        <MessageBox />
      </div>
    </div>
  );
}

export default LandingPage;

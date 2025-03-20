import React, { useEffect } from 'react';
import useStore from '../components/store';
import AudioRecorder from '../components/AudioRecorder';
import MessageBox from '../components/MessageBox';
import ChatLog from '../components/ChatLog';
import { io } from 'socket.io-client';

function LandingPage() {
  const setMessages = useStore(state => state.setMessages);
  const socket = useStore(state => state.socket);
  const setSocket = useStore(state => state.setSocket);
  const addMessage = useStore(state => state.addMessage);

  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:4000'));
      return;
    }

    socket.emit('message', `${new Date().toLocaleTimeString()}: New user joined`);

    socket.on('previous messages', (messages) => {
      setMessages(messages);
    });

    socket.on('chat message', (msg) => {
      addMessage(msg);
    });

    return () => socket.disconnect();
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white">
    <div className="flex flex-col items-center justify-between h-full w-full max-w-4xl p-6">
      <h1 className="text-3xl font-semibold mb-4">Live Chat</h1>
      <ChatLog />
      <MessageBox />
      <AudioRecorder />
    </div>
  </div>
  );
}

export default LandingPage;

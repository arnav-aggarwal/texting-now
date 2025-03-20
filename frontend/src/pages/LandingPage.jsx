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
    <div style={styles.container}>
      <h1>Live Chat</h1>
      <ChatLog />
      <MessageBox />
      <AudioRecorder />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
};

export default LandingPage;
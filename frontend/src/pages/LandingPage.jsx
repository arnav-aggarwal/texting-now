import React, { useEffect } from 'react';
import useStore from '../components/store';
import MessageBox from '../components/MessageBox';
import ChatLog from '../components/ChatLog';
import { io } from 'socket.io-client';

function LandingPage() {
  const socket = useStore(state => state.socket);
  const setSocket = useStore(state => state.setSocket);
  const addMessage = useStore(state => state.addMessage);
  const userName = useStore(state => state.userName);

  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:4000'));
      return;
    }

    socket.emit('user joined', userName);
    socket.on('server message', (msg) => {
      addMessage(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white px-2 sm:px-4 md:px-6 py-4">
      <div className="flex flex-col items-center w-full max-w-4xl h-full">

        {/* Header */}
        <p className="text-gray-400 text-center text-sm sm:text-base mb-2 w-full px-2">
          You are logged in as <span className="font-bold text-white">{userName}</span>
        </p>

        {/* Chat Log fills remaining space */}
        <div className="flex-grow flex flex-col w-full bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 overflow-hidden">
          <ChatLog />
        </div>

        {/* MessageBox */}
        <div className="mt-3 w-full flex justify-center px-2">
          <MessageBox />
        </div>
      </div>
    </div>
  );

}

export default LandingPage;

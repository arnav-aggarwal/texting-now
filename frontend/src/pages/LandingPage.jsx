import React, { useEffect } from 'react';
import useStore from '../components/store';
import MessageBox from '../components/MessageBox';
import ChatLog from '../components/ChatLog';
import UserName from '../components/UserName';
import { io } from 'socket.io-client';

function LandingPage() {
  const socket = useStore(state => state.socket);
  const setSocket = useStore(state => state.setSocket);
  const addMessage = useStore(state => state.addMessage);
  const userName = useStore(state => state.userName);

  useEffect(() => {
    if (!socket) {
      const newSocket = io(import.meta.env.VITE_SERVER_URL);
      setSocket(newSocket);
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
    <div className="h-[100dvh] w-screen flex flex-col bg-gray-900 text-white px-2 sm:px-4 md:px-6 py-4">
      {/* Header */}
      <div className="shrink-0 text-gray-400 text-center text-sm sm:text-base mb-2 w-full px-2">
        You are logged in as <UserName />
      </div>

      {/* Chat Log */}
      <div className="flex-1 w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 overflow-y-auto">
        <ChatLog />
      </div>

      {/* MessageBox */}
      <div className="shrink-0 w-full max-w-3xl mx-auto mt-3 flex justify-center px-2">
        <MessageBox />
      </div>
    </div>

  );

}

export default LandingPage;

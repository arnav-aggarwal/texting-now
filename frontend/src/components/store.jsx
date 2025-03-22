// store.jsx
import { create } from 'zustand';
import { colorFromName } from '../utils';

const useStore = create((set, get) => {
  const userName = localStorage.getItem('userName') || `user-${Math.floor(Math.random() * 1000)}`;
  localStorage.setItem('userName', userName);
  const userColor = colorFromName(userName);

  return {
    socket: null,
    setSocket: (socket) => set({ socket }),
    messages: [],
    userName,
    setUserName: newName => set({ userName: newName }),
    userColor,
    addMessage: (message) => set((state) => ({
      messages: [...state.messages, message],
    })),
    sendMessage: (text) => {
      const { socket, userName, userColor } = get();
      const message = {
        text,
        sender: userName,
        color: userColor,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit('client message', message);
    },
  };
});

export default useStore;

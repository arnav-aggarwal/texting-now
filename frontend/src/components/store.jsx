// store.jsx
import { create } from 'zustand';

const useStore = create((set, get) => {
  const userName = localStorage.getItem('userName') || `user-${Math.floor(Math.random() * 1000)}`;
  localStorage.setItem('userName', userName);

  return {
    socket: null,
    setSocket: (socket) => set({ socket }),
    messages: [],
    userName,
    setUserName: newName => set({ userName: newName }),
    addMessage: (message) => set((state) => ({
      messages: [...state.messages, message],
    })),
    sendMessage: (text) => {
      const { socket, userName } = get();
      const message = {
        text,
        sender: userName,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit('client message', message);
    },
  };
});

export default useStore;

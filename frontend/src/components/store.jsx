// store.jsx
import { create } from 'zustand';

const useStore = create((set, get) => {
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  const userName = localStorage.getItem('userName') || `user-${Math.floor(Math.random() * 1000)}`;
  localStorage.setItem('userName', userName);

  return {
    socket: null,
    setSocket: (socket) => set({ socket }),
    messages: [],
    userName,
    userColor: randomColor,
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

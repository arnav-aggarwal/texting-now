// store.jsx
import { create } from 'zustand';

const useStore = create((set, get) => ({
  socket: null,
  setSocket: socket => set({ socket }),
  messages: [],
  addMessage: newMessage => {
    set(state => ({ messages: [...state.messages, newMessage] }));
  },
  sendMessage: newMessage => {
    get().socket.emit('message', newMessage);
  },
  setMessages: messages => {
    set(() => ({ messages }))
  }
}));

export default useStore;

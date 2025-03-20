import { create } from 'zustand';

const useStore = create(set => ({
  socket: null,
  setSocket: socket => set({ socket }),
  messages: [],
  setMessages: newMessage => {
    if (typeof newMessage === 'string') {
      set(state => ({ messages: [...state.messages, newMessage] }))
    } else {
      set(state => ({ messages: newMessage }));
    }
  },
}));

export default useStore;

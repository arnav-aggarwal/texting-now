import { useState } from 'react';
import useStore from './store';

function UserName() {
  const userName = useStore(state => state.userName);
  const setUserName = useStore(state => state.setUserName);
  const socket = useStore(state => state.socket);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(userName);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== userName) {
      setUserName(trimmed);
      localStorage.setItem('userName', trimmed);
      if (socket?.connected) {
        socket.emit('user joined', trimmed); // re-identify
      }
    }
    setEditing(false);
  };

  return editing ? (
    <input
      autoFocus
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={handleSubmit}
      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      className="bg-gray-800 text-white px-2 py-1 rounded border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  ) : (
    <span
      onClick={() => setEditing(true)}
      className="inline-block font-bold text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-700 hover:text-blue-400 transition-colors duration-200"
      title="Click to change your name"
    >
      ✎ {userName}
    </span>
  );
}

export default UserName;

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
      className="bg-gray-800 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  ) : (
    <span
      onClick={() => setEditing(true)}
      className="font-bold text-white underline cursor-pointer hover:text-blue-400"
      title="Click to change your name"
    >
      {userName}
    </span>
  );
}

export default UserName;

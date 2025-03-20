import React, { useState } from 'react';
import useStore from './store';

function MessageBox() {
  const sendMessage = useStore(state => state.sendMessage);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      sendMessage(`${new Date().toLocaleTimeString()}: ${inputValue}`);
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center w-full max-w-3xl p-3 bg-gray-900 rounded-lg">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="flex-grow p-3 rounded-l-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSubmit}
        className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition-all duration-200"
      >
        Send
      </button>
    </div>
  );
}

export default MessageBox;

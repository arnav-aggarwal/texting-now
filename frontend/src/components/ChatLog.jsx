import React, { useEffect, useRef } from 'react';
import useStore from './store';

function ChatLog() {
  const messages = useStore(state => state.messages);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
<div className="flex flex-col w-full max-w-3xl h-[400px] p-4 bg-gray-800 rounded-lg overflow-y-auto">
      {messages.map((text, index) => (
        <div
          key={index}
          className={`p-3 my-1 rounded-lg max-w-[75%] text-white ${
            index % 2 === 0 ? 'bg-blue-500 self-end' : 'bg-gray-600 self-start'
          }`}
        >
          {text}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatLog;

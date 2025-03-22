import React, { useEffect, useRef } from 'react';
import useStore from './store';
import { colorFromName } from '../utils';

function ChatLog() {
  const messages = useStore((state) => state.messages);
  const currentUser = useStore((state) => state.userName);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      {messages.map((msg, index) => {
        const isCurrentUser = msg.sender === currentUser;
        const isSystem = msg.sender === 'System';
        const bubbleColor = isSystem ? '#4B5563' : colorFromName(msg.sender); // gray-600 fallback

        return (
          <div
            key={index}
            className={`p-3 my-1 rounded-lg max-w-[75%] ${
              isCurrentUser ? 'self-end' : 'self-start'
            }`}
            style={{
              backgroundColor: bubbleColor,
              wordBreak: 'break-word'
            }}
          >
            <div className="text-xs opacity-80 mb-1">
              {isCurrentUser ? 'You' : msg.sender} • {msg.timestamp}
            </div>
            <div className={`text-white ${isSystem ? 'italic text-gray-300' : ''}`}>{msg.text}</div>
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatLog;

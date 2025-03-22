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

        return (
          <div
            key={index}
            className={`p-3 my-1 rounded-lg max-w-[75%] ${
              isCurrentUser ? 'self-end' : 'self-start'
            }`}
            style={{
              backgroundColor: colorFromName(msg.sender),
              wordBreak: 'break-word'
            }}
          >
            <div className="text-xs opacity-80 mb-1">
              {isCurrentUser ? 'You' : msg.sender} • {msg.timestamp}
            </div>
            <div className="text-white">{msg.text}</div>
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatLog;

import React, { useEffect, useRef } from 'react';
import useStore from './store';

function ChatLog() {
  const messages = useStore(state => state.messages).toReversed();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.chatContainer}>
      {messages.map((text, index) => (
        <div
          key={index}
          style={{
            ...styles.messageBubble,
            alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start',
            backgroundColor: index % 2 === 0 ? '#007bff' : '#444',
          }}
        >
          {text}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}

// ✅ Updated Styling
const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    width: '100%',
    height: '400px',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
  },
  messageBubble: {
    padding: '10px 15px',
    margin: '5px 0',
    color: 'white',
    borderRadius: '15px',
    maxWidth: '75%',
    wordWrap: 'break-word',
  },
};

export default ChatLog;
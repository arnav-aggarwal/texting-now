// ChatLog.jsx
import React, { useState, useRef } from 'react';
import useStore from './store';

function ChatLog() {
  const messages = useStore(state => state.messages).toReversed();

  return (
    <div style={styles.chatContainer}>
      {messages.toReversed().map((text, index) => (
        <div key={index} style={styles.messageBubble}>
          {text}
        </div>
      ))}
    </div>
  );
}

// ✅ Inline Styles for Simplicity
const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '15px',
    borderRadius: '10px',
    // boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
    maxHeight: '400px',
  },
  messageBubble: {
    padding: '10px 15px',
    margin: '5px 0',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '15px',
    maxWidth: '75%',
    alignSelf: 'flex-start',
  },
};

export default ChatLog;

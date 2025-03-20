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
    <div style={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type your message..."
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>
        Send
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    gap: '10px',
  },
  input: {
    width: '70%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #444',
    fontSize: '1rem',
    backgroundColor: '#333',
    color: 'white',
    outline: 'none',
  },
  button: {
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    padding: '10px 15px',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MessageBox;
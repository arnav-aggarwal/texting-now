import React, {useState} from 'react';
import useStore from './store';

function MessageBox() {
  const sendMessage = useStore(state => state.sendMessage);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if(inputValue !== '') {
      sendMessage(`${new Date().toLocaleTimeString()}: ${inputValue}`);
      setInputValue('');
    }
  };


  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text here"
        />
      </div>
      <div>
        <button onClick={handleSubmit}>
          Submit Message
        </button>
      </div>
    </div>
  )
}

export default MessageBox;

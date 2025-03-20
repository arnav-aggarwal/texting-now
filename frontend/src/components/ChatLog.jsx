import React, { useState, useRef } from 'react';
import useStore from './store';

function ChatLog() {
  const messages = useStore(state => state.messages).toReversed();

  return (
    <div>{
      messages.toReversed().map(text => (
        <div key={text}>
          {text}
        </div>
      ))
      }</div>
  );
}

export default ChatLog;

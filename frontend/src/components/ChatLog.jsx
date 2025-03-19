import React, { useState, useRef } from 'react';

function ChatLog({ messages = ['Test first message', 'Test second message'] }) {
  const reversed = messages.toReversed();

  return (
    <div>{
      reversed.map(text => (
        <div key={text}>
          {text}
        </div>
      ))
      }</div>
  );
}

export default ChatLog;
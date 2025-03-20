import React, { useState, useRef } from 'react';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    audioChunks.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();
    setRecording(true);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play(); // Quickly test playback
    };
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

export default AudioRecorder;

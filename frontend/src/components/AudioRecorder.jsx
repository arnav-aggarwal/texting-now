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
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-900 text-white rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold">Audio Recorder</h2>
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300
          ${recording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

export default AudioRecorder;

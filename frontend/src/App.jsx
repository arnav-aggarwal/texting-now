import LandingPage from './pages/LandingPage';
import './App.css'

function App() {
  return (
    <>
      <h1>Audio Recorder</h1>
      <div className="card">
        <LandingPage />
      </div>
    </>
  )
}

export default App;


import { io } from 'socket.io-client';
const socket = io('http://localhost:4000');

socket.emit('test_message', 'Hello server!');

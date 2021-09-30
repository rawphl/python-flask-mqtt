import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000")

socket.on("connect", (e) => {
  console.log("connect", socket)
})

socket.on("ping", (e) => {
  console.log(e)
})

socket.on("mqtt_message", (e) => {
  console.log(e)
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

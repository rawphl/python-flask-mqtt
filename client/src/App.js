import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

function App() {
  const socketRef = useRef(null)
  const [data, setData] = useState([])
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const socket = io("http://10.0.103.84:5000")
    socket.on("connect", (e) => {
      console.log("connect", socket)
      socket.emit("subscribe", { topic: "rooms/shedhalle"})
    })
    
    socket.on("ping", (e) => {
      console.log(e)
    })
    
    socket.on("mqtt_message", (e) => {
      const d = JSON.parse(e)
      d.payload = JSON.parse(d.payload)
      if(d.payload.angle > 0) {
        setData(data => [...data, d])
        setRotation(d.payload.angle)
      }

    })
    socketRef.current = socket
  }, [])


  return (
    <div className="App">
      <div style={{
        background: "red",
        margin: "10em",
        width: "100px",
        height: "100px",
        transform: `rotateZ(${rotation % 360}deg)`
      }}></div>
    </div>
  );
}

export default App;

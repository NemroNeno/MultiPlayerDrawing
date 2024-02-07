import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Fyro from "./Fyro";
import SubscribeCard from "./SubscribeCard";
import CreateRoom from "./components/CreateRoom";
import { Route, Routes } from "react-router-dom";
import JoinRoom from "./components/JoinRoom";
import io from "socket.io-client";
const server = "http://localhost:5000";

function App() {
  const socket = io.connect(server);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState("");
  const [roomId, setRoomId] = useState(null);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<CreateRoom socket={socket} setUser={setUser} setRoomIdProp={setRoomId} />}
        />
        <Route
          path="/:roomId"
          element={<JoinRoom socket={socket} user={user} roomId={roomId} />}
        />
      </Routes>
    </div>
  );
}

export default App;

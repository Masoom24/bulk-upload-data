// socket.js
import { io } from "socket.io-client";

const socket = io("https://bulk-upload-data-1.onrender.com", {
  transports: ["websocket"],
});
export default socket;

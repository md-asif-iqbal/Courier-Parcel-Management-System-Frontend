import { io } from 'socket.io-client';

// Point to your running Express server
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

// Establish a WebSocket connection
const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

export default socket;

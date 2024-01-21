import { DEV_HOST, DEV_SCHEME, DEV_SOCKET } from '@env';
import { io, Manager } from 'socket.io-client';

const socket = io(`${DEV_SCHEME}://${DEV_HOST}:${DEV_SOCKET}`, {
  transports: ['websocket'],
});

socket.io.on('error', (error: any) => {
  console.log(error);
});

export default socket;

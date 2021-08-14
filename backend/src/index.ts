import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { AddressInfo } from "net";

const port = process.env.PORT || 3000;

const server = createServer();
const io = new Server(server, {});

const shutdown = () => {
  console.log('shutting down application...');

  io.close();
  server.close();

  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

io.on('connection', (socket: Socket) => {
  socket.on('ping', (...args) => {
    socket.emit('pong', ...args);
  });
});

server.listen(port, () => {
  const addr = server.address() as AddressInfo;
  console.log('server listening on [%s]:%d', addr.address, addr.port);
});
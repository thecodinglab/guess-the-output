import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import {AddressInfo} from 'net';
import {logger} from './logger';

const port = process.env.PORT || 3000;

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const shutdown = () => {
  logger.info(`shutting down application...`);

  io.close();
  server.close();

  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

io.on('connection', (socket: Socket) => {
  const addr = socket.handshake.address;
  const clientLogger = logger.child({client: addr});

  clientLogger.info(`client connected`);

  socket.on('ping', (...args) => {
    socket.emit('pong', ...args);
  });

  socket.on('disconnect', () => {
    clientLogger.info(`client disconnected`);
  });
});

server.listen(port, () => {
  const addr = server.address() as AddressInfo;
  logger.info(`server listening on [${addr.address}]:${addr.port}`);
});

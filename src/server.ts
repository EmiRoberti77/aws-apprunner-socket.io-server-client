import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();
const port = process.env.PORT || 8003;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('connected new socket', new Date().toISOString(), socket.id);
  const message = `hello from ${socket.id}`;
  socket.broadcast.emit('message', message);
  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);
  });
});

server.listen(port, () => {
  console.log(port, new Date().toISOString(), 'server started');
});

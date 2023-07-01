const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true
    }
  });
  
  io.on('connection', socket => {
    socket.on('chat', (data) => {
      socket.join(data.id);
      io.to(data.id).emit('chat', data);
      console.log(data);
    });
  });
  app.use(express.json());

  server.listen(8001, () => console.log('Socket ready'));
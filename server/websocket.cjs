import io from 'socket.io';

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('message', (message) => {
    console.log('Mensaje recibido:', message);

 
    io.emit('chatbot', message);
  });

  socket.on('chatbot', (message) => {
    console.log('Mensaje del chatbot recibido:', message);

 
    io.emit('message', message);
  });
});

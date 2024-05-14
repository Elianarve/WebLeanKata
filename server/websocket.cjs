import io from 'socket.io';

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('message', (message) => {
    console.log('Mensaje recibido:', message);

    // Reenvía el mensaje al chatbot
    io.emit('chatbot', message);
  });

  socket.on('chatbot', (message) => {
    console.log('Mensaje del chatbot recibido:', message);

    // Reenvía el mensaje al frontend
    io.emit('message', message);
  });
});

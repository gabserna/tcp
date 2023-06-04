const net = require('net');
const fs = require('fs');

const PORT = 5050;
let clients = [];

const server = net.createServer((socket) => {
  const clientId = clients.length + 1;
  socket.write(`Welcome to the chat server, User${clientId}!\n`);

  //add the new user to list of connected users
  clients.push(socket);

  //notification to all users that a new user entered
  clients.forEach((client) => {
    if (client !== socket) {
      client.write(`User${clientId} has joined the chat.\n`);
    }
  });

  //log connection message to a chat.log file
  const message = `User${clientId} has connected.\n`;
  console.log(message);
  fs.appendFileSync('chat.log', message);

  //when user sends a message, re-write to all users
  socket.on('data', (data) => {
    let payload = data.toString()
    let newPayload = payload.split(' ')
    const message = `User${clientId}: ${payload}`;
    console.log(message);

    fs.appendFileSync('chat.log', message);

    clients.forEach((client) => {
      if (client !== socket) {
        client.write(message);
      }
    });
  });

  //when user disconnected, remove them from the list of connected clients
  socket.on('end', () => {
    const message = `User${clientId} just disconnected.\n`;
    console.log(message);
    fs.appendFileSync('chat.log', message);

    clients = clients.filter((client) => client !== socket);

    //send notification to other users that the user has disconnected
    clients.forEach((client) => {
      client.write(`User${clientId} has left the chat.\n`);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
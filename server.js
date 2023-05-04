const net = require('net');
const fs = require('fs');

const PORT = 3000;
let clients = [];

const server = net.createServer((socket) => {
  const clientId = clients.length + 1;
  socket.write(`Welcome to the chat server, Client${clientId}!\n`);

  // Add the new client to the list of connected clients
  clients.push(socket);

  // Send a notification to all other clients that a new user has connected
  clients.forEach((client) => {
    if (client !== socket) {
      client.write(`Client${clientId} has joined the chat.\n`);
    }
  });

  // Log the connection message to a server.log file
  const message = `Client${clientId} has connected.\n`;
  console.log(message);
  fs.appendFileSync('server.log', message);

  // When the client sends a message, rebroadcast it to all clients
  socket.on('data', (data) => {
    const message = `Client${clientId}: ${data.toString()}`;
    console.log(message);
    fs.appendFileSync('server.log', message);

    clients.forEach((client) => {
      if (client !== socket) {
        client.write(message);
      }
    });
  });

  // When the client disconnects, remove them from the list of connected clients
  socket.on('end', () => {
    const message = `Client${clientId} has disconnected.\n`;
    console.log(message);
    fs.appendFileSync('server.log', message);

    clients = clients.filter((client) => client !== socket);

    // Send a notification to all other clients that the user has disconnected
    clients.forEach((client) => {
      client.write(`Client${clientId} has left the chat.\n`);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
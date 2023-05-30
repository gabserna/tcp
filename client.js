const net = require('net');

const client = net.createConnection(5050, () => {
  console.log('Connected to the chat server.');

  // Pipe the input stream to the client socket
  process.stdin.pipe(client);
});

client.on('data', (data) => {
  console.log(data.toString());
});
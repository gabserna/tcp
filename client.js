const net = require('net');
const readline = require('readline');

const PORT = 3000;
const HOST = '127.0.0.1';

const socket = net.connect(PORT, HOST, () => {
  console.log('Connected to the chat server.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    socket.write(input);
  });
});

socket.on('data', (data) => {
  console.log(data.toString());
});
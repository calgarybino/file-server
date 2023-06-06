const net = require('net');

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
  console.log('Connected to server.');

  const filename = 'example.txt';
  console.log(`Requesting file: ${filename}`);

  client.write(filename);
});

client.on('data', data => {
  console.log(`Received file data:\n${data}`);
});

client.on('end', () => {
  console.log('Disconnected from server.');
});
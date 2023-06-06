const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.on('connection', socket => {
  console.log('Client connected.');

  socket.on('data', data => {
    const filename = data.toString().trim();
    console.log(`Received request for file: ${filename}`);

    fs.readFile(filename, 'utf8', (err, fileData) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        socket.write(`Error: File '${filename}' not found.`);
      } else {
        console.log(`Sending file: ${filename}`);
        socket.write(fileData);
      }

      socket.end();
    });
  });

  socket.on('end', () => {
    console.log('Client disconnected.');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
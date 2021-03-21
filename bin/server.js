#!/usr/bin/env node
const http = require('http');

const getPort = () => {
  const defaultPort = 9000;
  const argv = process.argv.slice(2);
  if (argv.length === 2 && argv[0] === '--port') {
    return argv[1];
  }
  return defaultPort;
};

const port = getPort();
const server = require('../lib/server');

http.createServer(server.requestListener).listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}...`);
});

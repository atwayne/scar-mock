const writeStatusCode = (res, statusCode, payload) => {
  const contentType = 'application/json; charset=utf-8';
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.write(payload || JSON.stringify({ status: statusCode }));
  res.end();
};

const ok = (res) => {
  writeStatusCode(res, 200);
};

const serverError = (res) => {
  writeStatusCode(res, 500);
};

const sneezy = (res) => {
  // once in every 10 request we screw up
  const dice = Math.ceil(Math.random() * 10);
  if (dice === 1) {
    return serverError(res);
  }
  return ok(res);
};

const notFound = (res) => {
  writeStatusCode(res, 404);
};

const echo = (req, res) => {
  const {
    protocol, path, method, headers,
  } = req;
  const requestBody = [];
  req.on('data', (chunks) => {
    requestBody.push(chunks);
  });
  req.on('end', () => {
    const message = {
      protocol, path, method, headers, body: Buffer.concat(requestBody).toString(),
    };
    writeStatusCode(res, 200, JSON.stringify(message));
  });
};

module.exports = {
  echo, notFound, sneezy, serverError, ok,
};

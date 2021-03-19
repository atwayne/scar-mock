const {
  echo, notFound, sneezy, serverError, ok,
} = require('./behaviour');

const route = (req, res) => {
  const { url } = req;
  switch (url) {
    case '/200':
      ok(res);
      break;
    case '/500':
      serverError(res);
      break;
    case '/sneezy':
      sneezy(res);
      break;
    case '/echo':
      echo(req, res);
      break;
    default:
      notFound(res);
  }
};

module.exports = { route };

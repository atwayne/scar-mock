const { route } = require('./router');

const log = (req) => {
  const now = new Date();
  const message = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${req.method}\t    ${req.url}`;
  console.log(message);
};

const enableCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || req.headers.referer?.slice(0, -1) || '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

const requestListener = (req, res) => {
  log(req);
  enableCors(req, res);
  route(req, res);
};

module.exports = { requestListener };

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' };

function handler(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.join(ROOT, urlPath.endsWith('/') ? `${urlPath}index.html` : urlPath);
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(file, (err, body) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' }).end(body);
  });
}

function start(port = Number(process.env.PORT) || 4173, host = process.env.HOST || '0.0.0.0') {
  return new Promise((resolve) => {
    const server = http.createServer(handler).listen(port, host, () => resolve(server));
  });
}

if (require.main === module) {
  start().then((server) => {
    console.log(`Pricing page running at http://localhost:${server.address().port}`);
  });
}

module.exports = { start };

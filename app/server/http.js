import http from 'node:http';

const HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=UTF-8',
};

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

export default (routing, port, console) => {
  http
    .createServer(async (req, res) => {
      try {
        res.writeHead(200, HEADERS);
        if (req.method !== 'POST') return res.end('"Not found"');
        const { url, socket } = req;
        const [place, name, method] = url.substring(1).split('/');
        if (place !== 'api') return res.end('"Not found"');
        const entity = routing[name];
        if (!entity) res.end('Not Found');
        const handler = entity[method.toLowerCase()];
        if (!handler) res.end('Not Found');
        const { args } = await receiveArgs(req);
        console.log(`${socket.remoteAddress} ${method} ${url}`);
        const result = await handler(...args);
        res.end(JSON.stringify(result));
      } catch (err) {
        console.dir({ err });
      }
    })
    .listen(port, () => console.log(`Listen on port ${port}`));
};

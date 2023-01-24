'use strict';

const http = require('node:http');
const receiveArgs = require('./body.js');
const db = require('./db.js');

const PORT = 3000;

const routing = {
  user: db('users')
}

const crud = { get: 'read', post: 'create', put: 'update', delete: 'delete' };

http.createServer(async (req, res) => {
  const { method, url, socket } = req;
  const [name, id] = url.substring(1).split('/');
  const entity = routing[name];
  if(!entity) res.send('Not Found');
  const procedure = crud[method.toLowerCase()];
  const handler = entity[procedure];
  if(!handler) res.status(404).send('Not Found');
  const args = [];
  const src = handler.toString();
  const substr = src.substring(0, src.indexOf(')'));
  if(substr.includes('(id')) args.push(id);
  if(substr.includes('{')) args.push(await receiveArgs(req));
  console.log(`${socket.remoteAddress} ${method} ${url}`);
  const result = await handler(...args);
  res.end(JSON.stringify(result.rows));
}).listen(PORT);

console.log(`Listen on port ${PORT}`);

'use strict';

const http = require('node:http');
const pg = require('pg');
const hash = require('./hash.js');
const receiveArgs = require('./body.js');

const PORT = 3000;

const pool = new pg.Pool({
  host: 'db',
  port: 5432,
  database: 'example',
  user: 'user',
  password: 'password',
});

const routing = {
  user: {
    get(id) {
      if (!id) return pool.query('SELECT id, login FROM users');
      const sql = 'SELECT id, login FROM users WHERE id = $1';
      return pool.query(sql, [id]);
    },

    async post({ login, password }) {
      const sql = 'INSERT INTO users (login, password) VALUES ($1, $2)';
      const passwordHash = await hash(password);
      return pool.query(sql, [login, passwordHash]);
    },

    async put(id, { login, password }) {
      const sql = 'UPDATE users SET login = $1, password = $2 WHERE id = $3';
      const passwordHash = await hash(password);
      return pool.query(sql, [login, passwordHash, id]);
    },

    delete(id) {
      const sql = 'DELETE FROM users WHERE id = $1';
      return pool.query(sql, [id]);
    },
  },
};

http.createServer(async (req, res) => {
  const { method, url, socket } = req;
  const [name, id] = url.substring(1).split('/');
  const entity = routing[name];
  if(!entity) res.send('Not Found');
  const handler = entity[method.toLowerCase()];
  if(!handler) res.status(404).send('Not Found');
  const args = [];
  const src = handler.toString();
  const substr = src.substring(0, src.indexOf(')'));
  if(substr.includes('(id')) args.push(id);
  if(substr.includes('{')) args.push(await receiveArgs(req));
  console.log(`${socket.remoteAddress} ${methid} ${url}`);
  const result = await handler(...args);
  res.end(JSON.stringify(result));
}).listen(PORT);

console.log(`Listen on port ${PORT}`);

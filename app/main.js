'use strict';

const db = require('./db.js');
const fsp = require('node:fs').promises;
const path = require('node:path');
const server = require('./transport/http.js');

const PORT = 3000;

const apiPath = path.join(__dirname, 'services');
const routing = {};

(async () => {
  const files =  await fsp.readdir(apiPath);
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    const filePath = path.join(apiPath, file);
    const entity = path.basename(file, '.js');
    routing[entity] = require(filePath);
  }
})();
server(routing, PORT);

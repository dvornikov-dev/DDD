'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const config = require('./config.js');
const deps = require('./dependencies.js')(config);
const server = require(`./server/${config.server}.js`);

const apiPath = path.join(__dirname, 'services');
const routing = {};

(async () => {
  const files =  await fsp.readdir(apiPath);
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    const filePath = path.join(apiPath, file);
    const entity = path.basename(file, '.js');
    routing[entity] = require(filePath)(deps);
  }
  server(routing, config.port, deps.console);
})();


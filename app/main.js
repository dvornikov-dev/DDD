import * as fsp from 'node:fs/promises';
import path from 'node:path';
import config from './config.js';
import depsInit from './dependencies.js';

const server = (await import(`./server/${config.server}.js`)).default;

const deps = depsInit(config);
const apiPath = path.join(process.cwd(), 'services');
const routing = {};

const files =  await fsp.readdir(apiPath);

for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const filePath = path.join(apiPath, file);
  const entity = path.basename(file, '.js');
  const init = (await import(filePath)).default;;
  routing[entity] = init(deps);
}

server(routing, config.port, deps.console);
'use strict';

const db = require('./db.js');
const server = require('./transport/http.js');

const PORT = 3000;
 
const routing = {
  user: require('./services/users.js'),
  city: db('city'),
  county: db('country'),
}

server(routing, PORT);

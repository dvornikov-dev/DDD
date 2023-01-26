'use strict';

const http = require('node:http');
const receiveArgs = require('../body.js');

module.exports = (routing, port) => {
    http.createServer(async (req, res) => {
        const { url, socket } = req;
        const [name, method, id] = url.substring(1).split('/');
        const entity = routing[name];
        if(!entity) res.end('Not Found');
        const handler = entity[method.toLowerCase()];
        if(!handler) res.end('Not Found');
        const args = [];
        const src = handler.toString();
        const substr = src.substring(0, src.indexOf(')'));
        if(substr.includes('(id')) args.push(id);
        if(substr.includes('{')) args.push(await receiveArgs(req));
        console.log(`${socket.remoteAddress} ${method} ${url}`);
        const result = await handler(...args);
        res.end(JSON.stringify(result.rows));
    }).listen(port, () => console.log(`Listen on port ${port}`)) 
};


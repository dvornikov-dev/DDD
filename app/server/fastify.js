'use strict';

const fastify = require('fastify')();
fastify.register(require('@fastify/cors'), {});

module.exports = (routing, port, console) => {
    const entities = Object.keys(routing);
    for (const entityName of entities) {
        const entity = routing[entityName];
        const methods = Object.keys(entity);
        for(const method of methods) {
            const handler = entity[method];
            fastify.post(`/api/${entityName}/${method}`, async (request, reply) => {
                const { args } = request.body;
                const result = await handler(...args);
                console.log(`${request.ip} ${method} ${request.url}`);
                reply.send(JSON.stringify(result.rows));
            });
        }
    }
    fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
        if(err) {
            process.exit(1);
        }
        console.log(`Server is now listening on ${address}`);
    });
};


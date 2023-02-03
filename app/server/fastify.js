import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify();
fastify.register(cors, {});

export default (routing, port, console) => {
  const entities = Object.keys(routing);
  for (const entityName of entities) {
    const entity = routing[entityName];
    const methods = Object.keys(entity);
    for (const method of methods) {
      const handler = entity[method];
      fastify.post(`/api/${entityName}/${method}`, async (request, reply) => {
        const { args } = request.body;
        const result = await handler(...args);
        console.log(`${request.ip} ${method} ${request.url}`);
        reply.send(JSON.stringify(result));
      });
    }
  }
  fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
  });
};

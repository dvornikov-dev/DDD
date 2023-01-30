'use strict';

const transport = {
  ws: (serviceName, methodName, url) => (...args) => new Promise((resolve) => {
    const socket = new WebSocket(url);
    const packet = { name: serviceName, method: methodName, args };
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(packet));
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        resolve(data);
      };
    });
  }),

  http: (serviceName, methodName, url) => (...args) => new Promise((resolve) => {
    url = url.endsWith('/') ? url.substring(0,url.length - 1) : url;
    fetch(`${url}/api/${serviceName}/${methodName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ args })
    }).then((response) => resolve(response.json())); // TODO: add reject
  })
}

const scaffold = (url, structure) => {
  const api = {};
  const services = Object.keys(structure);
  const type = url.startsWith('ws') ? 'ws' : 'http';
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = transport[type](serviceName, methodName, url);
    }
  } 
  return api;
};

const api = scaffold('ws://127.0.0.1:3000/', {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
  }
});

(async () => {
  const data = await api.user.read(3, { login: 'user3', password: '123'});
  console.dir({ data });
})();
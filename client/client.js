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

  http: (serviceName, methodName, url) => (...args) => new Promise((resolve, reject) => {
    url = url.endsWith('/') ? url.substring(0,url.length - 1) : url;
    fetch(`${url}/api/${serviceName}/${methodName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ args })
    }).then((response) => {
      if(response.status == 200) resolve(response.json());
      else reject(new Error("Status code: " + response.status));
    });
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

const api = scaffold('http://127.0.0.1:3000/', {
  user: {
    create: [['login', 'password']],
    read: ['id'],
    update: ['id', ['login', 'password']],
    delete: ['id'],
  },
  role: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
  },
  auth: {
    login: [['login', 'password']],
    logout: [],
    refresh: ['token']
  },
  messenger: {
    createArea: ['name'],
    addAreaUser: [['areaId', 'userId']],
    sendMessage: [['text', 'userId', 'areaId']],
    getAreaMessages: ['areaId'],
    getAreaUsers: ['areaId'],
  },
  area: {
    create: [['name', 'ownerId', 'status']],
  }
});

(async () => {
  let data = await api.auth.login({ login:'marcus', password:'marcus' });
  console.dir({ data });
  data = await api.area.create({ name: 'Test', ownerId: 2, status: 1 });
  console.dir({ data });
  data = await api.messenger.addAreaUser({ areaId: 1, userId: 3 });
  console.dir({ data });
  data = await api.messenger.sendMessage({ text: 'Hi there!', userId: 2, areaId: 1 });
  console.dir({ data });
  data = await api.messenger.getAreaMessages({ areaId: 1 });
  console.dir({ data });
  data = await api.messenger.getAreaUsers({ areaId: 1 });
  console.dir({ data });
})();
import { Server } from 'ws';

export default (routing, port, console) => {
    const ws = new Server({ port });
    ws.on('connection', (ws, req) => {
        const ip = req.socket.remoteAddress;
        ws.on('message', async (message) => {
            const obj = JSON.parse(message);
            const {name, method, args = []} = obj;
            const entity = routing[name];
            if(!entity) ws.send('Not Found', { binary: false });
            const handler = entity[method.toLowerCase()];
            if(!handler) ws.send('Not Found', { binary: false });
            const json = JSON.stringify(args);
            const parameters = json.substring(1, json.length - 1);
            console.log(`${ip} ${name}.${method}(${parameters})`);
            try {
                const result = await handler(...args);
                ws.send(JSON.stringify(result.rows), { binary: false });
            } catch (e) {
                console.dir({ er});
            }
        });
    }); 
};


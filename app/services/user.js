'use strict';

module.exports = (context) => {
    const users = context.db('users');

    return {
        read(id) {
            return users.read(id, ['id', 'login']);
        },
        async create({login, password}) {
            const passwordHash = await context.hash(password);
            return users.create({login, password: passwordHash});
        },
        async update(id, { login, password }) {
            const passwordHash = await context.hash(password);
            return users.update(id, { login, password: passwordHash });
        },
        delete(id) {
            return users.delete(id);
        },
    }
}
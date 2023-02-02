export default ({ db, hash }) => {
    const users = db('users');
    return {
        async read(id) {
            return users.read(id, ['id', 'login']);
        },
        async create({ login, password }) {
            const passwordHash = await hash(password);
            return users.create({ login, password: passwordHash });
        },
        async update(id, { login, password }) {
            const passwordHash = await hash(password);
            return users.update(id, { login, password: passwordHash });
        },
        async delete(id) {
            return users.delete(id);
        },
    }
}
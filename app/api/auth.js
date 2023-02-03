export default ({ db }) => ({
  async login({ login, password }) {
    console.log({ method: 'auth.login', login, password, db });
    return { status: 'ok' };
  },

  async logout() {
    console.log({ method: 'auth.logout' });
    return { status: 'ok' };
  },

  async refresh({ token }) {
    console.log({ method: 'auth.refresh', token });
    return { status: 'ok' };
  },
});

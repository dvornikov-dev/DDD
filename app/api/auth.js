export default ({ db }) => {

    return {
        async registration({ login, password }) {
            console.log({ method: 'auth.reg', login, password });
            return { status: 'ok' };
        },

        async login({ login, password }) {
            console.log({ method: 'auth.login', login, password });
            return { status: 'ok' };
        },

        async logout() {
            console.log({ method: 'auth.logout' });
            return { status: 'ok' };
        },

        async refresh({ token }) {
            console.log({ method: 'auth.refresh', token });
            return { status: 'ok' };
        }
    }
};
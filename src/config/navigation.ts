export const routes = {
    user: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
        },
        home: '/',
    },
    admin: {
        auth: {
            login: '/admin/auth/login',
        },
        dashboard: '/admin/dashboard',
    },
};

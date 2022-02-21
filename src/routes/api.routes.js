module.exports = function (routes, actions, middlewares) {
    routes.register({
        prefix: 'auth',
    }, (router) => {
        router.post('/register', actions.auth.register);
        router.post('/login', actions.auth.login);
        router.post('/forgot-password', actions.auth.forgotPassword);
        router.get('/verify-token/:token', actions.auth.verifyCode);
        router.put('/reset-password', actions.auth.resetPassword);
        router.post('/login-as', middlewares.isAuthenticated, middlewares.allowedRoles(['ADMIN']), actions.auth.loginAs);
    });

    routes.register({
        prefix: 'me',
        middlewares: [
            middlewares.isAuthenticated
        ]
    }, (router) => {
        router.get('/', actions.me.userDetails);
        router.put('/', actions.me.updateUserDetails);
    });

    routes.register({
        prefix: 'worklogs',
        middlewares: [
            middlewares.isAuthenticated,
            middlewares.allowedRoles(['REGULAR', 'ADMIN'])
        ]
    }, (router) => {
        router.get('/export', actions.worklogs.exportWorklogs);
        router.get('/', actions.worklogs.getWorklogs);
        router.post('/', actions.worklogs.createWorklog);
        router.get('/:id', actions.worklogs.getWorklogDetails);
        router.put('/:id', actions.worklogs.updateWorklog);
        router.delete('/:id', actions.worklogs.deleteWorklog);
    });

    routes.register({
        prefix: 'users',
        middlewares: [
            middlewares.isAuthenticated,
            middlewares.allowedRoles(['USER_MANAGER', 'ADMIN'])
        ]
    }, (router) => {
        router.get('/', actions.users.getUsers);
        router.post('/', actions.users.createUser);
        router.get('/:id', actions.users.getUserDetails);
        router.post('/:id', actions.users.updateUser);
        router.delete('/:id', actions.users.deleteUser);
    });
}

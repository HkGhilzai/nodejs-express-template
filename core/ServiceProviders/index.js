const path = require('path');

module.exports = class ServiceProviders {
    constructor(app) {
        this.app = app;
    
        this.providers = {
            'env': require('./EnvProvider'),
            'logger': require('@tms/logger'),
            'errors': require('./ErrorClassProvider'),
            'helpers': require('./HelperProvider'),
            'services': require('./ServicesProvider'),
            'middlewares': require('./MiddlewaresProvider'),
            'actions': require('./ActionsProvider'),
            'emails': require('@tms/emails'),
            'database': require('@tms/database'),
            'express': require('@tms/express'),
            ...require(path.join(this.app.__basedir, 'src', 'config', 'providers.js'))
        };

        Object.keys(this.providers).forEach((provider) => {
            this.providers[provider] = new this.providers[provider](this.app);
        });
    }

    boot() {
        Object.keys(this.providers).forEach((provider) => {
            if (typeof this.providers[provider].boot === 'function') {
                this.providers[provider].boot();
            }
        });

        this.app.core.providers = this.providers;
    }
}

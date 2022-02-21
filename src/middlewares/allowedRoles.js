module.exports = function(roles = []) {
    return  (req, res, next) => {
        if (!Array.isArray(roles)) {
            return next();
        }

        const allowed = roles.includes(req?.user?.role);

        if (allowed) {
            return next();
        }

        return next(new this.errors.ForbiddenError());
    };
}

module.exports = async function (req, res, next) {
    const { id } = req.params;
    const payload = req.body;

    const user = await this.models.User.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!user) {
        throw new this.errors.NotFoundError('User not found!');
    }

    const emailTaken = await this.models.User.findOne({
        where: {
            email: payload.email.trim()
        }
    });

    if (emailTaken) {
        throw new this.errors.BadRequestError('Email already taken.');
    }

    if (req.user.role !== 'ADMIN' && user.role === 'ADMIN') {
        throw new this.errors.BadRequestError('Cannot update admin.');
    }

    if (req.user.role !== 'ADMIN' && payload.role === 'ADMIN') {
        throw new this.errors.BadRequestError('Cannot create admin users.');
    }

    if (payload.password?.trim()) {
        payload.password = await this.helpers.makeHash(payload.password)
    }

    await this.models.User.update(payload, {
        where: {
            id
        }
    });

    return res.json({});
}


module.exports.validations = ({ body }) => {
    return [
        body('first_name').not().isEmpty().trim().escape(),
        body('last_name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail(),
    ];
};

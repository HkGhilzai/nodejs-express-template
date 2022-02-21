module.exports = async function(req, res, next) {
    const user = await this.services.user.createUser(req.body);

    this.emails.InviteEmail.sendEmail({
        user: {
            ...user.toJSON(),
            password: req.body.password
        },
        invitedBy: req.user.user_name
    });

    return res.status(201).json({
        user
    });
}

module.exports.validations = ({ body }) => {
    return [
        body('first_name').not().isEmpty().trim().escape(),
        body('last_name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('password').trim().isLength(8),
        body('role').trim().not().isEmpty().isIn(['REGULAR', 'USER_MANAGER', 'ADMIN']),
    ];
};

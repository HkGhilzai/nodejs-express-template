module.exports = async function (req, res, next) {
    const user_id = req.body.user_id;

    const user = await this.models.User.findOne({
        attributes: ['id', 'email', 'role'],
        where: {
            id: user_id
        }
    });

    if (!user) {
        throw new this.errors.NotFoundError({
            message: 'User not found!'
        });
    }

    const token = this.services.auth.issueJWT({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return res.json({
        token: token
    });
}

module.exports.validations = ({ body }) => {
    return [
        body('user_id').not().isEmpty(),
    ];
};

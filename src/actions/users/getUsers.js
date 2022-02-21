module.exports = async function(req, res, next) {
    let where = {};

    if (req.user.role !== 'ADMIN') {
        where.role = {
            [this.db.$op.ne]: 'ADMIN'
        };
    }

    const users = await this.models.User.findAll({
        attributes: {
            exclude: ['password']
        },
        where
    });

    return res.json({
        users
    });
}

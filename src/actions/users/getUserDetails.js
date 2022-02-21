module.exports = async function(req, res, next) {
    const user = await this.models.User.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!user) {
        throw new this.errors.NotFoundError('User not found!');
    }

    return res.json({
        user
    });
}

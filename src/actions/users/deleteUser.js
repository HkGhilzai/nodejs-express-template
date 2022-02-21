module.exports = async function(req, res, next) {
    await this.models.User.destroy({
        where: {
            id: req.params.id
        }
    });

    return res.json({});
}

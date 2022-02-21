module.exports = async function(req, res, next) {
    const { id } = req.params;

    await this.models.Worklog.destroy({
        where: {
            id,
            user_id: req.user.id,
        }
    });

    return res.json({
        id
    });
}


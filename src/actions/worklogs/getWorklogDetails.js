module.exports = async function(req, res, next) {
    const { id } = req.params;

    const worklog = await this.models.Worklog.findOne({
        where: {
            id,
            user_id: req.user.id,
        }
    });

    return res.json({
        worklog
    });
}


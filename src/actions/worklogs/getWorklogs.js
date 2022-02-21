module.exports = async function(req, res, next) {
    const {
        from,
        to
    } = req.query;

    const worklogs = await this.services.worklog.getWorklogs({
        user: req.user,
        from,
        to,
    });

    return res.json({
        worklogs
    });
}

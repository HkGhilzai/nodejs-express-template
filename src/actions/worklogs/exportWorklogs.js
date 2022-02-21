module.exports = async function(req, res, next) {
    const {
        from,
        to
    } = req.query;

    const html = await this.services.worklog.generateWorklogsExport({
        user: req.user,
        from,
        to,
    });

    return res.json({
        html
    });
}

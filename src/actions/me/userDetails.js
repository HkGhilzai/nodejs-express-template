module.exports = async (req, res, next) => {
    if (!req.user) {
        return res.json({
            user: null,
        });
    }

    return res.json({
        user: req.user
    });
}

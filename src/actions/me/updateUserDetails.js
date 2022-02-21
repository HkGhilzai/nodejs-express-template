module.exports = async function (req, res, next) {
    const {
        preferredWorkingHours,
    } = req.body;

    let preferences = {};

    if (preferredWorkingHours) {
        preferences = {
            ...req.user.preferences,
            preferredWorkingHours
        };
    }

    await this.models.User.update({
        preferences
    }, {
        where: {
            email: req.user.email
        }
    });

    return res.json({});
}

module.exports.validations = ({ body }) => {
    return [
        body('preferredWorkingHours').not().isEmpty(),
    ];
};

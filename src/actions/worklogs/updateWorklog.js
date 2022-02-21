module.exports = async function(req, res, next) {
    const {
        hoursWorked,
        notes
    } = req.body;
    const { id } = req.params;

    await this.models.Worklog.update({
        hours_worked: hoursWorked,
        notes
    }, {
        where: {
            id,
            user_id: req.user.id,
        }
    });

    return res.json({});
}

module.exports.validations = ({ body }) => {
    return [
        body('date').not().isEmpty(),
        body('hoursWorked').not().isEmpty(),
        body('notes').trim().not().isEmpty(),
    ];
};

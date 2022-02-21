module.exports = async function(req, res, next) {
    const {
        date,
        hoursWorked,
        notes
    } = req.body;

    const worklog = await this.models.Worklog.create({
        user_id: req.user.id,
        date,
        hours_worked: hoursWorked,
        notes
    });

    return res.status(201).json({
        worklog
    });
}

module.exports.validations = ({ body }) => {
    return [
        body('date').not().isEmpty(),
        body('hoursWorked').not().isEmpty(),
        body('notes').trim().not().isEmpty(),
    ];
};

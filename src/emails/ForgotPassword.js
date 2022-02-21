const Email = require('@tms/emails').Email;

module.exports = class ForgotPasswordEmail extends Email {
    constructor(app) {
        super({
            app,
            subject: 'Forgot Password',
        });
    }

    sendEmail({
        user,
        link
    }) {
        const html = this.generateTemplate({ user, link });

        return this.send({
            to: user?.email,
            html,
        });
    }

    generateTemplate({
        user,
        link
    }) {
        return `
            <html>
                <h3>Hi ${user?.user_name},</h3>
                <p>Click on the following link to reset password <a href="${link}">${link}</a></p>
            </html>
        `;
    }
}

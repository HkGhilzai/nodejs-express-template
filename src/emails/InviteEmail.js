const Email = require('@tms/emails').Email;

module.exports = class InviteEmail extends Email {
    constructor(app) {
        super({
            app,
            subject: 'Invitation TMS',
        });
    }

    sendEmail({ user, invitedBy }) {
        const html = this.generateTemplate({ user, invitedBy });

        return this.send({
            to: user?.email,
            html,
        });
    }

    generateTemplate({ user, invitedBy }) {
        return `
            <html>
                <h3>Hi ${user?.user_name},</h3>
                <p>You have been invited to TMS by ${invitedBy}. Use the below credentials to login.</p>
                <p>Email: ${user.email}</p>
                <p>Password: ${user.password}</p>
            </html>
        `;
    }
}

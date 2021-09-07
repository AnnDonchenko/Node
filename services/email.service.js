const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { variables, statusCodes, statusMessages } = require('../config');
const allTemplates = require('../email-templates');
const { ErrorHandler } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(statusCodes.serverError, statusMessages.wrongTemplate);
    }

    const { templateName, subject } = templateInfo;
    context.frontendURL = variables.FRONTEND_SITE;

    const html = await templateParser.render(templateName, context);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: variables.NO_REPLY_EMAIL,
            pass: variables.NO_REPLY_EMAIL_PASSWORD
        }
    });

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};

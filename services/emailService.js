const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Get data from environment variables
const EMAIL_COMPANY_NAME = process.env.EMAIL_COMPANY_NAME || 'MartiPE';
const EMAIL_LOGO_PATH = process.env.EMAIL_LOGO_PATH || 'assets/logos/logo.png';
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_SECURE = process.env.EMAIL_SECURE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Support Email
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'admin@marrso.com';

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE === 'true',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

const sendEmail = async (to, subject, text, templateName, replacements, attachments = []) => {
    try {
        const templatePath = path.join(__dirname, 'templates', `${templateName}.html`);
        const html = await fs.promises.readFile(templatePath, 'utf8');

        // Add EMAIL_COMPANY and current year to substitutions if they are not present
        replacements.companyName = EMAIL_COMPANY_NAME;
        replacements.currentYear = new Date().getFullYear();

        // Replace the placeholders in the template with real data
        const replacedHtml = html.replace(/{{([^{}]*)}}/g, (match, key) => {
            return replacements[key.trim()] || '';
        });

        // Include the company logo as an embedded attachment
        const logoPath = path.join(__dirname, EMAIL_LOGO_PATH);
        attachments.push({
            filename: 'logo.png',
            path: logoPath,
            cid: 'companylogo' // CID used in HTML template
        });

        // Definition of email
        const mailOptions = {
            from: `${EMAIL_COMPANY_NAME} <${EMAIL_USER}>`,
            to: to,
            bcc: SUPPORT_EMAIL, // Sending a copy to support
            subject: subject,
            text: text,
            html: replacedHtml,
            attachments: attachments,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to: ${to} and BCC: ${SUPPORT_EMAIL}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;

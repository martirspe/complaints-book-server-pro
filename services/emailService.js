const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Obtener datos de las variables de entorno
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_SECURE = process.env.EMAIL_SECURE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

const sendEmail = async (to, subject, text, templateName, replacements) => {
    try {
        const templatePath = path.join(__dirname, 'templates', `${templateName}.html`);
        const html = await fs.promises.readFile(templatePath, 'utf8');

        // Replace placeholders in the template with actual data
        const replacedHtml = html.replace(/{{([^{}]*)}}/g, (match, key) => {
            return replacements[key.trim()] || '';
        });

        const mailOptions = {
            from: EMAIL_USER,
            to: to,
            subject: subject,
            html: replacedHtml
        };

        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${to}`);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = sendEmail;

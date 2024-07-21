const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Obtener datos de las variables de entorno
const EMAIL_COMPANY = process.env.EMAIL_COMPANY || 'MartiPE';
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_SECURE = process.env.EMAIL_SECURE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Configuración del transportador de Nodemailer
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

        // Añadir EMAIL_COMPANY y el año actual a las sustituciones si no están presentes
        replacements.nombreEmpresa = EMAIL_COMPANY;
        replacements.currentYear = new Date().getFullYear();

        // Reemplazar los placeholders en la plantilla con datos reales
        const replacedHtml = html.replace(/{{([^{}]*)}}/g, (match, key) => {
            return replacements[key.trim()] || '';
        });

        // Incluir el logo de la empresa como archivo adjunto embebido
        const logoPath = path.join(__dirname, 'assets', 'logo.png');
        attachments.push({
            filename: 'logo.png',
            path: logoPath,
            cid: 'companylogo' // mismo cid que se usa en la plantilla de HTML
        });

        // Definición del correo electrónico
        const mailOptions = {
            from: `${EMAIL_COMPANY} <${EMAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: replacedHtml,
            attachments: attachments,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${to}`);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = sendEmail;

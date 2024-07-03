const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-password'
    }
});

exports.enviarNotificacion = (destinatario, asunto, mensaje) => {
    const mailOptions = {
        from: 'tu-email@gmail.com',
        to: destinatario,
        subject: asunto,
        text: mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo: ', error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

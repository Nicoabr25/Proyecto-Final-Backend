import nodemailer from "nodemailer";
import { options } from "./options.js";

//Transporter

export const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: options.email.email_admin,
        pass: options.email.email_password,
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    } //para que no tenga en cuenta si la pagina es https
});

//funcion para generar el correo de recuperar la contraseña

const sendRecoveryPass = async (userEmail, token) => {
    const link = `https://proyecto-final-backend-production-8d8e.up.railway.app//forgot?token=${token}`; //enlace con token para mandar al cliente para recuperar su contraseña
    //estuctura del correo
    await transporter.sendMail({
        from: options.email.email_admin,
        to: userEmail,
        subject: "Restablecer contraseña",
        html: `
            <div>
                <h2>Ha solicitado un cambio de contraseña</h2>
                <p>Da click en el siguiente boton para restablecer la contraseña</p>
                <a href="${link}">
                    <button>Restablecer Contraseña</button>
                </a>
            </div>
        `
    })
}

export { sendRecoveryPass }
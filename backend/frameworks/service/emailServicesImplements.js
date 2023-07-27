import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export default function emailServices() {
    const sentEmail = (mailOptions) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,

                },
            });

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error happned on sending email', error);
                    return { status: false }
                } else {
                    console.log('email is sent to:' + mailOptions.to, info.response);
                    return { status: true }
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    return {
        sentEmail
    }
}
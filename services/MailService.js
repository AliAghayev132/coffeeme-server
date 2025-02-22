import nodemailer from "nodemailer";

class MailService {
    static mailSender = async ({ email, title, body, attachments = [] }) => {
        try {
            let transporter = nodemailer.createTransport({
                service: "",
                host: process.env.MAIL_HOST,
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            });
            let info = await transporter.sendMail({
                to: email,
                html: body,
                subject: title,
                attachments: attachments,
                from: `CoffeeMe ${process.env.MAIL_USER}`
            });
            return info;
        } catch (error) {
            console.log(error);
        }
    };
}

export { MailService };

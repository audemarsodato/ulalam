const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        post: 465,
        secure: true,
        auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_EMAIL_PASS
        }
})

async function sendVerificationEmail({ user, token, frontendUrl }) {
        const emailInfo = await transporter.sendMail({
                from: process.env.AUTH_EMAIL,
                to: user.email,
                subject: 'Verify your email address',
                html: `
                <div style='
                        font-family: Arial, sans-serif;
                        padding: 16px;

                        border-top: 4px solid #E52E01;
                        border-bottom: 4px solid #d3d3d3;
                '>
                        <p>Hi, ${user.username}! You're one step away!</p>
                        <h1 style='margin: 12px 0;'>Verify your email address</h1>
                        <p>We need to verify your email before you can use ulalam</p>
                        <div style='
                                display: flex;
                                justify-content: center;
                                align-items: center;
                        '>
                                <a style='
                                        display: inline-block;
                                        margin: auto;
                                        padding: 12px 20px;

                                        border-radius: 4px;
                                        text-decoration: none;
                                        font-weight: 600;
                                        background-color: #E52E01;
                                        color: #fff;
                                ' href='${frontendUrl}/verify-email?token=${token}'>
                                        Verify your email
                                </a>
                        </div>
                        <p>This verification link will expire in 2 minutes</p>
                </div>
                `
        })

        return emailInfo
}

module.exports = {
        sendVerificationEmail
}
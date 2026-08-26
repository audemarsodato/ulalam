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

async function sendVerificationEmail({ user, token, verificationLink}) {
        const emailInfo = await transporter.sendMail({
                from: process.env.AUTH_EMAIL,
                to: user.email,
                subject: 'Verify your email',
                text: `Hello world, verify your email: ${token}`
        })

        return emailInfo
}

module.exports = {
        sendVerificationEmail
}
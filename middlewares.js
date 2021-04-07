const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        password: process.env.PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

module.exports = transporter
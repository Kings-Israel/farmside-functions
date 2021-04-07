const transporter = require('../middlewares')

let headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type',
}

exports.handler = async function(event, context) {
    try {
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: '204', headers }
        }
        const body = JSON.parse(event.body)
        var mailOptions = {
            from: process.env.EMAIL,
            to: 'kingsmilimo@yahoo.com',
            subject: `New message from ${body.name}`,
            text: `Message:\n ${body.message}\n\n Phone Number: ${body.phone_number} Email: ${body.email}`,
            replyTo: `${body.email}`
        }
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({
                        message: 'Failed',
                    })
                    
                }
            } else {
                return {
                    statusCode: 200,
                    headers,
                    body: {
                        message: 'success',
                    }
                    
                }
            }
        })
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            headers,
            body: error.toString()
        }
    }
    
}
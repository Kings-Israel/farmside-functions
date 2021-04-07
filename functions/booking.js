const transporter = require('../middlewares')

exports.handler = async function(event, context) {
    try {
        const body = JSON.parse(event.body)
        var mailOptions = {
            from: process.env.EMAIL,
            to: 'kingsmilimo@yahoo.com',
            subject: `New booking from ${body.name}`,
            text: `Booking Details:\n Client Name: ${req.body.name}, Phone Number: ${req.body.phone_number}, Email: ${req.body.email}\n
                Event Date: ${req.body.event_date}, Event's Location: ${req.body.location},\n
                Event Duration: ${req.body.event_duration}, Event Type: ${req.body.event_type}, Event: ${req.body.event_details.event}\n
                Number of People Expected: ${req.body.event_details.number_of_people},\n 
                Outfit Change: ${req.body.event_details.outfit_change}, Number of Outfit Changes: ${req.body.event_details.number_of_outfit_changes}\n
                Other Description: ${req.body.event_details.description}`,
            replyTo: `${body.email}`
        }
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return {
                    statusCode: 500,
                    message: 'Failed'
                }
            } else {
    
                return {
                    statusCode: 200,
                    message: 'success'
                }
            }
        })
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: error.toString()
        }
    }
    
}
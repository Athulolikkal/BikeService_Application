import dotenv from 'dotenv'
dotenv.config()

export default async function changeBookingStatus(bookingId, value, userDb, emailService) {
    try {
        //changing the status of booking by using bookingId
        const changeStatus = await userDb.changeBookingStatus(bookingId, value)
        if (changeStatus) {
           //if status changed
            if (value === 'Completed') {
                //if changed values is completed the simply return  
                return { status: true, message: 'progress updated successfully......' }
            } else {
                //if it is ready for delivery then senting the message the content of message is setting here and passing it to email service as argument
                const userEmail = changeStatus?.email
                const mailOptions = {
                    from: process.env.USER_EMAIL,
                    to: userEmail,
                    subject: 'Service is now ready to deliver',
                    text: `Dear ${changeStatus?.userName},
                    
                    Your booking is now ready for deliver:
    
                    Your service ${changeStatus?.serviceName} at the service date of ${changeStatus?.date} is now ready for take deliver
                    Total payable amount of your service is ${changeStatus?.serviceRate}.
                    thankyou for choosing us !
                     `,
                };
                 //passing content to sentemail service 
                await emailService.sentEmail(mailOptions)
              //after email sented return success state
                return { status: true, message: 'progress updated successfully......' }

            }
        } else {
            return { status: false, message: 'something went wrong.....' }
        }

    } catch (err) {
        console.log(err);
    }
}
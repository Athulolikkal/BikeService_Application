import dotenv from 'dotenv'
dotenv.config()
import bookingEntity from "../../../entities/bookingEntity.js";

export default async function addBookingUsecase(userId, userName, serviceId, serviceName, rate, email, date, userDb, emailService) {
    try {
        //checking if same named service,same user on same date booked?
        const isAlreadyHave = await userDb.isAlreadyBooked(userId, serviceId, date)
        if (isAlreadyHave) {
            //if already booked then no need to book again
            return { status: false, message: 'same service already booked on same day.....' }
        } else {
            //if not booked then passing data as arguments in entity
            const bookingDetails = await bookingEntity({ userId, userName, serviceId, serviceName, rate, date, email })
            //creating booking
            const setBooking = await userDb.addToBooking(bookingDetails)
            if (setBooking) {

                const mailOptions = {
                    from: process.env.USER_EMAIL,
                    to: process.env.USER_EMAIL,
                    subject: 'Booking Infromation ',
                    text: `Dear Admin,
                    
                    We Have an Booking:
    
                     Date : ${date}
                     Service: ${serviceName}
                     Rate: ${rate}
                     Customer Name: ${userName}
                     User Email:${email}
                     `,
                };

                await emailService.sentEmail(mailOptions)
                return { status: true, message: 'booked successfully' }
            } else {
                return { status: false, message: 'something went wrong.....' }
            }
        }
    } catch (err) {
        console.log(err);
    }
}
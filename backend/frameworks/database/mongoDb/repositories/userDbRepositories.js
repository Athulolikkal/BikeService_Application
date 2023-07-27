import bookingSchema from '../model/bookingSchema.js'

export default function userRepositories() {

    const isAlreadyBooked = async (userId, serviceId, date) => {
        try {
            const isBooked = await bookingSchema.findOne({ userId: userId, serviceId: serviceId, date: date })
            return isBooked
        } catch (err) {
            console.log(err);
        }
    }

    const addToBooking = async (bookings) => {
        try {
            const newBooking = await bookingSchema({
                serviceId: bookings?.getServiceId(),
                serviceName: bookings?.getServiceName(),
                serviceRate: bookings?.getServiceRate(),
                date: bookings?.getDate(),
                userName: bookings?.getUserName(),
                userId: bookings?.getUserId(),
                email: bookings?.getEmail()
            })
            return newBooking.save()
        } catch (err) {
            console.log(err);
        }
    }

    const findUserBookingById = async (userId) => {
        try {
            const findUserBooking = await bookingSchema.find({ userId: userId }).sort({ _id: -1 });
            return findUserBooking
        } catch (err) {
            console.log(err);
        }
    }

    const getAllBooking = async () => {
        try {
            const allBookings = await bookingSchema.find().sort({ _id: -1 });
            return allBookings
        } catch (err) {
            console.log(err);
        }
    }

    const changeBookingStatus = async (bookingId, value) => {
        try {
            const isChangeBookingStatus = await bookingSchema.findByIdAndUpdate(bookingId, { status: value });
            return isChangeBookingStatus
        } catch (err) {
            console.log(err);
        }
    }
    return {
        isAlreadyBooked,
        addToBooking,
        findUserBookingById,
        getAllBooking,
        changeBookingStatus
    }
}
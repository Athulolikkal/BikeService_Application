export default function userDbInterfaceRepositories(repositories) {
    const isAlreadyBooked = (userId, serviceId, date) => repositories.isAlreadyBooked(userId, serviceId, date)
    const addToBooking = (bookingDetails) => repositories.addToBooking(bookingDetails)
    const findUserBookingById = (userId) => repositories.findUserBookingById(userId)
    const getAllBooking = () => repositories.getAllBooking()
    const changeBookingStatus = (bookingId,value) => repositories.changeBookingStatus(bookingId,value)
    return {
        isAlreadyBooked,
        addToBooking,
        findUserBookingById,
        getAllBooking,
        changeBookingStatus
    }
}
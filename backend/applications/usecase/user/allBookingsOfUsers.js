export default async function getAllBookingsOfAllUsers(userDb) {
    try {
        //find all booking
        const allBookings = await userDb.getAllBooking()
        return allBookings
    } catch (err) {
        console.log(err);
    }
}
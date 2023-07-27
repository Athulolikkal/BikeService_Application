export default async function getUserBookingsById(userId,userDb){
try{
    //find the all user bookings by userId
    const userBooking = await userDb.findUserBookingById(userId)
    return userBooking
}catch(err){
    console.log(err);
}
}
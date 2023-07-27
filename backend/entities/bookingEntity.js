export default function bookingEntity(booking) {
 //providing of more security to the core data at the time of creation
 // it returns a function for  that retrun the actual data
 // on this section when when creating booking the data of creating booking is comes as prameter and setting function that retruns the data at inital statge of creation
    try {
        return {
            getServiceId: () => booking?.serviceId,
            getServiceName: () => booking?.serviceName,
            getServiceRate: () => booking?.rate,
            getDate: () => booking?.date,
            getUserName: () => booking?.userName,
            getUserId: () => booking?.userId,
            getEmail: () => booking?.email

        }
    } catch (err) {
        console.log(err);
    }
}
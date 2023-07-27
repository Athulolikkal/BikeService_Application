import addBookingUsecase from "../../applications/usecase/user/addBooking.js"
import getUserBookingsByIdUsecase from "../../applications/usecase/user/getUserBookingById.js"
import getAllBookingsOfAllUsers from "../../applications/usecase/user/allBookingsOfUsers.js"
import changeBookingStatusUsecase from "../../applications/usecase/user/changeBookingStatus.js"

export default function userControllers(userDbInterfaceRepositories, userRepositories, emailServicesImplements, emailServicesInterface) {
    const userDb = userDbInterfaceRepositories(userRepositories())
    const emailService = emailServicesInterface(emailServicesImplements())

    const addBooking = (req, res) => {
        const { userId, userName, serviceId, serviceName, rate, email, date } = req?.body
        addBookingUsecase(userId, userName, serviceId, serviceName, rate, email, date, userDb, emailService).then((response) => {
            res.json(response)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getUserBookingById = (req, res) => {
        const { userId } = req?.query
        getUserBookingsByIdUsecase(userId, userDb).then((response) => {
            res.json(response)
        }).catch((err) => {
            console.log(err);
        })
    }

    const allBookings = (req, res) => {
        getAllBookingsOfAllUsers(userDb).then((response) => {
            res.json(response)
        }).catch((err) => console.log(err))
    }

    const changeBookingStatus = (req, res) => {
        const { bookingId, value } = req?.body
        changeBookingStatusUsecase(bookingId, value, userDb, emailService).then((response) => {
            res.json(response)
        }).catch((err) => console.log(err))

    }

    return {
        addBooking,
        getUserBookingById,
        allBookings,
        changeBookingStatus
    }
}
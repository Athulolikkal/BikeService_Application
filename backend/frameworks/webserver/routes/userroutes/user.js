import userControllers from "../../../../adapters/controllers/userControllers.js";
import userDbInterfaceRepositories from "../../../../applications/repositories/userDbinterfaceRepositories.js";
import userRepositories from "../../../database/mongoDb/repositories/userDbRepositories.js";
import emailServicesImplements from "../../../service/emailServicesImplements.js";
import emailServicesInterface from "../../../../applications/service/emailServicesInterface.js";

export default function userRoutes(express) {
    try {
        const router = express.Router();
        const controller = userControllers(userDbInterfaceRepositories, userRepositories, emailServicesImplements, emailServicesInterface)

        router.route('/servicebooking').post(controller.addBooking)
        router.route('/userbookingsbyid').get(controller.getUserBookingById)
        router.route('/allbookings').get(controller.allBookings)
        router.route('/changestatus').patch(controller.changeBookingStatus)

        return router
    } catch (err) {
        console.log(err);
    }
}
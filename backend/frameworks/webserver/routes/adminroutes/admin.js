import adminControllers from "../../../../adapters/controllers/adminControllers.js";
import adminDbRepoImplements from "../../../database/mongoDb/repositories/adminDbRepositories.js";
import adminDbRepoInterface from "../../../../applications/repositories/adminDbinterfaceRepositories.js";

export default function adminRoutes(express) {
    try {
        const router = express.Router();
        const controller = adminControllers(
            adminDbRepoImplements,
            adminDbRepoInterface)

        router.route('/addservices').post(controller.addServices)
        router.route('/allservices').get(controller.getAllActiveServices)
        router.route('/editservice').put(controller.editServiceDetails)
        router.route('/removeservice').patch(controller.removeService)

        return router
    } catch (err) {
        console.log(err);
    }
}
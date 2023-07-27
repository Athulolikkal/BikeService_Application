import authenticationController from "../../../../adapters/controllers/authControllers.js";
import authDbInterfance from "../../../../applications/repositories/authDbinterfaceRepositories.js";
import authenticationRepositoriesImplements from "../../../database/mongoDb/repositories/authDbRepositories.js";
import authServicesImplements from "../../../service/authservices.js";
import authServicesInterfaces from "../../../../applications/service/authServicesInterface.js";

export default function authentication(express) {
    try {
        const router = express.Router();
        const controller = authenticationController(
            authDbInterfance,
            authenticationRepositoriesImplements,
            authServicesImplements,
            authServicesInterfaces
        )
       
        router.route('/usersignup').post(controller.userSignUp)
        router.route('/userlogin').post(controller.userLogin)
        router.route('/adminlogin').post(controller.adminLogin)


        return router
    } catch (err) {
        console.log(err);
    }
}
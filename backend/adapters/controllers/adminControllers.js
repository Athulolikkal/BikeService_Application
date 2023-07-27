//all logics are written in usecases so thats are importing here and using
import addServicesUsecase from "../../applications/usecase/admin/addServicesUseCase.js";
import getAllAvailableServicesUsecase from "../../applications/usecase/admin/getAllAvailableServices.js";
import editServiceDetailsUsecase from "../../applications/usecase/admin/editServiceDetails.js";
import removeServiceUsecase from "../../applications/usecase/admin/removeServiceUsecase.js";


export default function adminControllers(adminDbRepoImplements, adminDbRepoInterface) {
    const adminDb = adminDbRepoInterface(adminDbRepoImplements()) 
    //just abstracting the actual implementation by calling it through an interface 

    const addServices = (req, res) => {
        const { name, rate, details } = req?.body
        addServicesUsecase(name, rate, details, adminDb).then((response) => {
            res.json(response)
        }).catch((err) => console.log(err))
    }
    const getAllActiveServices = (req, res) => {
        getAllAvailableServicesUsecase(adminDb).then((response) => {
            res.json(response)
        }).catch((err) => console.log(err))
    }

    const editServiceDetails = (req, res) => {
        const { serviceId, name, rate, details } = req?.body
        editServiceDetailsUsecase(serviceId, name, rate, details, adminDb).then((response) => {
            res.json(response);
        }).catch((err) => console.log(err))
    }
   
    const removeService = (req, res) => {
        const { serviceId } = req?.body
        removeServiceUsecase(serviceId,adminDb).then((response)=>{
            res.json(response)
        }).catch((err)=>console.log(err))
       

    }
    return {
        addServices,
        getAllActiveServices,
        editServiceDetails,
        removeService
        //returning these functions for calling it in routes
    }
}
import serviceSchema from '../model/serviceSchema.js'
//on this part the actual implementation is works . Abstracting this implementation with an interface. 
//calling all the functions on its interface
export default function adminRepositories() {

    const findServiceByName = async (name) => {
       //finding if the service is already available
        try {
            return await serviceSchema.findOne({ servicename: name })
        } catch (err) {
            console.log(err);
        }
    }

    const addServices = async (details) => {
       //creating new service
        try {
            const newService = await new serviceSchema({
                servicename: details?.getServiceName(),
                rate: details?.getRate(),
                details: details?.getDetails()
                //assigning new values. here when we geting the entity function that contain all data needed 
                // assigning values to feild
            })
            return newService.save()
        } catch (err) {
            console.log(err);
        }
    }

    const getAllActiveServices = async () => {
        try {
            return await serviceSchema.find({ status: true }).sort({ _id: -1 });
            //finding active plans by checking the status and also sorting by _id the we get the last added fast
        } catch (err) {
            console.log(err);
        }
    }

    const findSimilarServiceName = async (id, name) => {
        try {
            const findSimilar = await serviceSchema.find({ _id: { $ne: id }, servicename: name })
            //when updating service finding if similar service is available by find expect that service have similar name
            return findSimilar
        } catch (err) {
            console.log(err);
        }
    }

    const editServiceData = async (serviceId, newName, rate, newDetails) => {
        try {
            const isEdited = await serviceSchema.findByIdAndUpdate(serviceId, {
                servicename: newName,
                rate: rate,
                details: newDetails
                //editing the service data
            })
            return isEdited
        } catch (err) {
            console.log(err);
        }
    }
    const removeService = async (serviceId) => {
        try {
            const removeService = await serviceSchema.findByIdAndUpdate(serviceId, { status: false })
            return removeService
            //removing the service means here i am making the status false like i am making it as non-active it not good pratice to remove details from data base
        } catch (err) {
            console.log(err);
        }
    }


    return {
        findServiceByName,
        addServices,
        getAllActiveServices,
        findSimilarServiceName,
        editServiceData,
        removeService
    }
}
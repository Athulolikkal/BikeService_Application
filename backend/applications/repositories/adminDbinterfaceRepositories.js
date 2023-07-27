export default function adminDbInterfaceRepositories(repositories) {
    // on controllers passing actual implementation on interface on this interface its taking the implements as parameters and when calling
    // the functions in interface it returning the same functions in the implements
   
     const findServiceByName = (name) => repositories.findServiceByName(name)
    const addServices = (details) => repositories.addServices(details)
    const getAllActiveServices = () => repositories.getAllActiveServices()
    const findSimilarServiceName = (id, name) => repositories.findSimilarServiceName(id, name)
    const editServiceData = (serviceId, newName, rate, newDetails) => repositories.editServiceData(serviceId, newName, rate, newDetails)
    const removeService = (serviceId) => repositories.removeService(serviceId)
    return {
        findServiceByName,
        addServices,
        getAllActiveServices,
        findSimilarServiceName,
        editServiceData,
        removeService

    }
}
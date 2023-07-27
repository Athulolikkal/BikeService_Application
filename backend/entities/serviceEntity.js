//service data comes here at the stage of creation and setting funciton for retruning each data for providing more security to data when creation

export default function serviceEntity(service) {
    try {
    return {
        getServiceName:()=>service?.newName,
        getRate:()=>service?.rate,
        getDetails:()=>service?.newDetails
    }
    } catch (err) {
        console.log(err);
    }
}
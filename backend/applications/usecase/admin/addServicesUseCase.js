import serviceEntity from "../../../entities/serviceEntity.js";

export default async function addServices(name, rate, details, adminDb) {
    try {
        const newName = name.toUpperCase()
        const newDetails = details.toLowerCase()
        const isService = await adminDb.findServiceByName(newName)
        //when adding service finding is service already available
        if (isService) {
            return {status:false,message:'service already here'}
        } else {
            // if not passing data to entity and enitiy return functons 
           const serviceDetails = await serviceEntity({newName,rate,newDetails})
           //function return by entity is passing to interface service that call the actual implements
           await adminDb.addServices(serviceDetails)
           return {status:true,message:'service added successfully'}
        }

    } catch (err) {
        console.log(err, 'err on adding services logic');
    }
}
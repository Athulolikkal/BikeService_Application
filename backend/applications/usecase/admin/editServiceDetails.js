export default async function editServiceDetails(serviceId, name, rate, details, adminDb) {
    try {
        const newName = name.toUpperCase()
        const newDetails = details.toLowerCase()
        //find is there any another similar named service available
        const isAnyAnotherName = await adminDb.findSimilarServiceName(serviceId, newName)
         
        if (isAnyAnotherName.length === 0) {
            //if not then editing data
            await adminDb.editServiceData(serviceId, newName, rate, newDetails)
            return { status: true, message: 'updated successfully' }
        } else {
            // if available returning status with false
            return { status: false, message: 'same named service already exists' }
        }

    } catch (err) {
        console.log(err);
    }

}
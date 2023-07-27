export default async function getAllAvailableServices(adminDb) {
    try {
        //finding all services available
        const allServices =await adminDb.getAllActiveServices()
        return allServices

    } catch (err) {
        console.log(err);
    }
}
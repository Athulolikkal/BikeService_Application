export default async function removeServiceUsecase(serviceId, adminDb) {
    try {
        //removing the service from admin side and both userside
        await adminDb.removeService(serviceId)
        return { status: true, message: 'service removed.....' }
    } catch (err) {
        console.log(err);
    }

}
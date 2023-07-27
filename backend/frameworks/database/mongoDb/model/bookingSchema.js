import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        ref: "service",
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    serviceRate: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        ref: "user",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }

})

const model = mongoose.model('bookings', bookingSchema)
export default model;
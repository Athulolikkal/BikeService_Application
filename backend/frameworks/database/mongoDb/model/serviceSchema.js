import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
    servicename: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }

})

const model = mongoose.model('service', serviceSchema)
export default model;
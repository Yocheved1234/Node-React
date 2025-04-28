import mongoose from "mongoose";

const advertiserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        maxLength: 50
    },

    code:{
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
        maxLength: 10,
    },

    phoneEx: {
        type: String,
        maxLength: 10,
    },

    apartArray: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Apartment' 
    }],

})
export default mongoose.model('Advertiser', advertiserSchema)
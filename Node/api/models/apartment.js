import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 20,
        require: true
    },
    description: String,
    pic: {
        type: String,
        required: false,
    },
    categories: {
        type: mongoose.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City',
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    numBed: {
        type: Number,
        required: true,
    },
    extras: String,
    price: {
        type: Number,
        required: false,
    },
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertiser',
        required: false
    }
});

export default mongoose.model('Apartment', apartmentSchema);

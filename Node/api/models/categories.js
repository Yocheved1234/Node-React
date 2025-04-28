import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
 
    arrayApart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }],

})
export default mongoose.model('categories', categoriesSchema);

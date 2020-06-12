import mongoose from "mongoose";
import validator from 'validator'

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid');
            }
        }
    }
  
})
 
export default mongoose.model.User || mongoose.model('User', userSchema);

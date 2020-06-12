import mongoose from "mongoose";
import validator from 'validator'

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'please add your first name'],
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'please add your last name'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'please add a valid email address'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid');
            }
        }
    },
    gitProfile: {
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL){
                throw new Error("Not a valid URL")
            }
        }
    }
  
}, {timestamps: true})
 
export default mongoose.model.User || mongoose.model('User', userSchema);

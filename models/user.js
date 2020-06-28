import mongoose from "mongoose";
import validator from 'validator'
import ProjectIdea from './project-idea'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
    username: {
        type: String,
        trim: true,
        required: [true, 'please add your username'],
    },
    password: {
        type: String,
        required: true
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
    project: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectIdea'}
    ],
    gitProfile: {
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL){
                throw new Error("Not a valid URL")
            }
        }
    },
    terms: {
        type: Boolean
    }
}, {timestamps: true})


//Before saving, hashing the passwords
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


//login validation
userSchema.statics.findByCredentials = async (username, password) =>  {
    await console.log("inside valiadtion model", username);
    
    const user = await User.findOne({username: username})    
    console.log("in model side:",user.username);
    
    if(!user) {
        throw new Error('User not valid')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log("matched:", isMatch)
    if(!isMatch){
        throw new Error('Password invalid')
    }

    return user
}


//Generating JWT Token
userSchema.methods.generateNewToken = async function() {
    
    const user = this
    // console.log("inside generateNewToken ccc",user);
    try {
        const token = await jwt.sign({_id: user._id}, 'iamironman')
        console.log("inside generateNewToken2",token);
        return token
    } catch (error) {
       console.log("Error generating token",error);      
    }
}


let User;
try {
  User = mongoose.model('User')
} catch (error) {
  User = mongoose.model('User', userSchema)
}

// console.log(User.schema.obj)
export default User;
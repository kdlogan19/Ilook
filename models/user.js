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


//login validation
userSchema.statics.findByCredentials = async (username, password) =>  {
    await console.log("inside valiadtion model", username);
    
    const user = await User.findOne({username})
    console.log("inside valiadtion model", user, username);
    if(!user) {
        throw new Error('User not valid')
    }
    // const isMatch = await bcrypt.compare(password, user.password)
    console.log("user password in validation section",user.password);
    
    const isMatch = (password === user.password)
    if(!isMatch){
        throw new Error('Password invalid')
    }

    return user
}


let User;
try {
  User = mongoose.model('User')
} catch (error) {
  User = mongoose.model('User', userSchema)
}

// console.log(User.schema.obj)
export default User;
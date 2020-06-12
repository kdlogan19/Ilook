import mongoose from 'mongoose'

const projectIdeaSchema  = mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: Text,
        required: true,
        trim: true
    },
    like: {
        type: Number
    },
    dislike:{
        type: Number
    }
    
})
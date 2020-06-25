import mongoose from 'mongoose'
import User from './user'

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
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        ref: 'User'
    },
    like: {
        type: Number
    },
    dislike:{
        type: Number
    },
    tags: {
        type: String
    },
    comments: [{
        userId: {
            type: String, 
            ref: 'User'
        },
        comment: {
            type: String,
            required: true,
            trim: true
        },
        upvote: {
            type: Number
        }
    }]
    
})


let ProjectIdea;
try {
  ProjectIdea = mongoose.model('ProjectIdea')
} catch (error) {
    ProjectIdea = mongoose.model('ProjectIdea', projectIdeaSchema)
}

export default ProjectIdea;
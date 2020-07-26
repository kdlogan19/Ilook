import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "please add your username"],
  },
  commentText: {
    type: String,
    trim: true,
  },
  projectID: {
    type: String,
  },
}, { timestamps: true });

commentSchema.statics.getProjectComments = async function getProjectComments(ID) {  
  try {
    const comments = await Comment.find({ projectID: ID }, ["username", "commentText", "updated At"], {sort: {updatedAt: -1}}).then((comments) => comments);
    return comments;
  } catch (error) {
    console.log("error occurred while fetching comments", error);
  }
};


let Comment;
try {
  Comment = mongoose.model("Comment");
} catch (error) {
  Comment = mongoose.model("Comment", commentSchema);
}

export default Comment;

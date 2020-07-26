import mongoose from "mongoose";
import User from "./user";

const projectIdeaSchema = mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  like: {
    type: Number,
  },
  dislike: {
    type: Number,
  },
  tags: {
    type: String,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],

},{ timestamps: true });

projectIdeaSchema.statics.getAllProjects = async function getAllProjects() {
  try {
    const projects = await ProjectIdea.find().populate("userId", "username").then((projects) => projects);
    // console.log("projects in schema:", projects)
    return projects;
  } catch (error) {
    console.log("Database query:", error);
  }
};

projectIdeaSchema.statics.getProjectData = async function getProjectData(id) {
  try {
    const project = await ProjectIdea.findById(id).populate({ path: "comments", options: {sort: {'updatedAt': -1}}}).then((project) => project);
    // console.log("single project:", project);
    return project;
  } catch (error) {
    console.log("Database query:", error);
  }
};

let ProjectIdea;
try {
  ProjectIdea = mongoose.model("ProjectIdea");
} catch (error) {
  ProjectIdea = mongoose.model("ProjectIdea", projectIdeaSchema);
}

export default ProjectIdea;

import jwt from "jsonwebtoken";
import dbconnect from "../../../middleware/dbconnect";
import ProjectIdea from "../../../models/project-idea";

dbconnect();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const projectData = req.body;
    const decoded = jwt.verify(req.body.token, "iamironman");
    const userId = decoded._id;
    projectData.userId = userId;
    console.log("Idea-form server side before save", projectData);
    const newProject = new ProjectIdea(projectData);
    console.log("Idea-form server side", newProject);
    try {
      await newProject.save();
      res.status(200).send({ body: newProject });
    } catch (e) {
      console.log("Project could not be saved", e);
      res.status("500").end();
    }
  } else {
    res.status("404").end();
  }
};

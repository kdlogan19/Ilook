import ProjectIdea from "../../../models/project-idea";
import dbconnect from "../../../middleware/dbconnect";
import Comment from "../../../models/comment";

dbconnect();

export default async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    console.log("in");
    const project = await ProjectIdea.getProjectData(req.headers.id);
    // console.log("api:", project)
    res.status(200).send({ project });
  }
};

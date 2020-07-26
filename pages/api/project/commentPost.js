import ProjectIdea from "../../../models/project-idea";
import dbconnect from "../../../middleware/dbconnect";
import Comment from "../../../models/comment";

dbconnect();

export default async (req, res) => {
  // console.log("req in comment", req);
  const { method, body } = req;
  if (method === "POST") {
    const newComment = new Comment(body);
    console.log(newComment)
    try {
      await newComment.save();
      // console.log("commentId :", newComment._id)
      await ProjectIdea.findByIdAndUpdate(
        { _id: body.projectID }, 
        { $push: { comments:  newComment._id } },
        { upsert: true, new: true },
      );
      return res.status(200).send({ body: newComment });
    } catch (e) {
      console.log("comment could not be posted", e);
      return res.status("500").end();
    }
  } else {
    res.status(404).send({ success: false });
  }
};

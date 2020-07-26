import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NavbarHome from "../../components/navbar-home";
import FooterHome from "../../components/footer-home";
import ProjectCard from "../../components/project-card";
import Comment from '../../components/comment'
import Router from "next/router";

export default function Project({ project }) {
  const [commentText, setCommentText] = useState("");
  const [commentsData, setCommentsData] = useState(project.comments);
  const postDate = new Date(project.createdAt)
  const postComment = async () => {
    // console.log("clicked", commentText);
    try {
      const res = await fetch("http://localhost:3000/api/project/commentPost", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentText, projectID: project._id, username: "user1" }),
      });
      const newComment = await res.json();
      // console.log("new comment in id", newComment.body);
      await setCommentsData([newComment.body, ...commentsData]);
      setCommentText("");
      // console.log("all comments :", commentsData)
    } catch (error) {
      console.log("index pre-render", error);
    }
  };

  return (
    <>
      <NavbarHome user="Look" />
      <div className="outermost-grid container-fluid">
        <div className="outermost-grid-row row">
          <div className="outermost-grid-column col-md-3 col-sm-12">Left Sidebar</div>
          <div className="outermost-grid-column col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header text-center">
                {project.title}
              </div>
              <div className="card-body">
                <div className="card-description">
                  <p className="card-text">{project.description}</p>
                </div>
               
              </div>
              <div className="container comment-section">
                <div className="comment-post-container">
                  <div className="form-group">
                    <textarea className="form-control form-control-sm" 
                    onChange={(text) => setCommentText(text.target.value)} 
                    value={commentText}
                    id="comment-text-box" 
                    rows="3" />
                  </div>
                  <Button className="btn-sm" onClick={postComment}>Post</Button>
                </div>
                <div className="previous-comments">
                  {commentsData.map((comment) => <Comment key={comment._id} commentData={comment} />)}
                </div>
              </div>
              <div className="card-footer text-muted">
                {postDate.getDate()}/{postDate.getMonth()}/{postDate.getFullYear()}
              </div>
            </div>
          </div>
          <div className="outermost-grid-column col-md-3 col-sm-12">
            <div className="row idea-button-container justify-content-center">
              <Button onClick={() => Router.push("/timeline/idea-form")}> + Post an Idea</Button>
            </div>
          </div>
        </div>
      </div>
      <FooterHome />

      <style jsx>
        {`
            .card-body {
              border-bottom: 1px solid rgba(0,0,0,.125);
            }
            .comment-section {
              padding: 5px 5px 5px;
              width: 100%;
            }
          `}
      </style>
    </>
  );
}

export async function getServerSideProps({ query }) {
  // Return a list of possible value for id
  let project;
  try {
    const res = await fetch("http://localhost:3000/api/project/getProjectData", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        id: query.id,
      },
    });
    const data = await res.json();
    // console.log("data:", data);
    project = data.project;
  } catch (error) {
    console.log("index pre-render", error);
  }
  //navigate to 404 if project not present
  // console.log("db query res:", project);
  return {
    props: {
      project,
    },
  };
}

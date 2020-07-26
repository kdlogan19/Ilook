import React from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <>
      <Link href={{ pathname: `/project/${project._id}`, query: { name: project.title } }} className="custom-card">
        <div className="project-card mx-auto card border-info">
          <div className="card-header">
            <div className="row project-title">
              {project.title}
            </div>
            <div className="project-author row">
              <p>{project.userId.username}</p>
            </div>
          </div>
          <Card.Body>

            <div className="card-text">
              <p>{project.shortDescription}</p>
            </div>
          </Card.Body>
        </div>
      </Link>
      <style jsx>
        {`
            a.custom-card {
                color: inherit;   
            }
            .project-card:hover {
                    transition: all 0.2s ease-out;
                    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
                    top: -4px;
              
            }
            .mx-auto {
                width: 100%;
                display:flex;
                flex-direction: column;
            }
            .project-title {
                font-size: 1.25rem;
            }
            .project-author p {
                font-size: 0.875rem;
            }
            `}
      </style>
      <br />
    </>
  );
}

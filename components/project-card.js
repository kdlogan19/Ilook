import React from 'react'
import { Card } from 'react-bootstrap'

export default function ProjectCard({project}) {
    return (
        <>
        <Card border="info" className="mx-auto">
            <Card.Header>{project.title}</Card.Header>
            <Card.Body>
            <Card.Title>Info Card Title</Card.Title>
            <Card.Text>
                <ul key={project._id}>
                    <li>{project.userId.username}</li>
                    <li>{project.title}</li>
                    <li>{project.shortDescription}</li>
                    <li>{project.description}</li>
                </ul>
            </Card.Text>
            </Card.Body>
        </Card>
        <style jsx>{`
            .mx-auto {
                width: 100%;
                display:flex;
                flex-direction: column;
            }
            `}
        </style>
        <br />
        </>
    )
}

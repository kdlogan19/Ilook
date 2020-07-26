import Head from "next/head";
import Link from "next/link";
import {
  Button, Container, Row, Col,
} from "react-bootstrap";
import Router from "next/router";
import Cookie from "js-cookie";
import cookie from "cookie";
import Sidebar from "react-sidebar";
import { useState, useEffect } from "react";
import auth from "../middleware/auth";

// Importing Common components
import NavbarHome from "../components/navbar-home";
import FooterHome from "../components/footer-home";
import ProjectCard from "../components/project-card";

export default function Home({ user, projects }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mql, setMql] = useState(true);
  // console.log("render:",projects)
  const token = Cookie.get("token");
  Cookie.set("name", "user1");

  useEffect(() => {
    console.log("window.innerHeight", window.innerHeight);
    // const mql = window.matchMedia(`(min-width: 800px)`);
    console.log("mql: ", mql);
    setSidebarOpen(mql.matches);
  });

  const onSetSidebarOpen = (val) => {
    setSidebarOpen(val);
  };
  return (

    <div>
      <NavbarHome user={user} />
      <div className="outermost-grid container-fluid">
        <div className="outermost-grid-row row">
          <div className="outermost-grid-column col-md-3 col-sm-12">Left Sidebar</div>
          <div className="outermost-grid-column col-md-6 col-sm-12">
            {projects.map((project) => <ProjectCard project={project} />)}
          </div>
          <div className="outermost-grid-column col-md-3 col-sm-12">
            <div className="row idea-button-container justify-content-center">
              <Button onClick={() => Router.push("/timeline/idea-form")}> + Post an Idea</Button>
            </div>
          </div>
        </div>

      </div>
      <Link href={{ pathname: "/project/[id]", query: { name: "test" } }}>
        <a>
          sdsds
        </a>
      </Link>
      <FooterHome />
      {/* Add a footer */}

      <style jsx>
        {`
                    .outermost-grid {
                      height: 100vh;
                    }
                    .outermost-grid-row {
                      height: 100%;
                    }
                    .outermost-grid-column {
                      height: 100%;
                    }
                    div {
                      outline: 2px solid black;  
                      minHeight: 50px;          
                    }
                    `}
      </style>

    </div>

  );
}

export async function getServerSideProps(ctx) {
  console.log("****************************************");
  let projects;
  const c = ctx.req.headers.cookie;
  try {
    const res = await fetch("http://localhost:3000/api/project/getAllProjects", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    projects = (await res.json()).projects;
  } catch (error) {
    console.log("index pre-render", error);
  }
  // console.log("db query res:", c, projects);
  if (!c) {
    return {
      props: {
        projects,
      },
    };
  }
  const { token } = cookie.parse(c);
  console.log("token:", token);
  if (!token) {
    return {
      props: {
        projects,
      },
    };
  }
  const { userId } = await auth(token);
  if (!userId) {
    return {
      props: {
        projects,
      },
    };
  }

  return {
    props: {
      user: "user",
      projects,
    },
  };
}

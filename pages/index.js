import Head from 'next/head'
import Link from 'next/link'
import {Button, Container, Row, Col} from 'react-bootstrap'
import Router from 'next/router'
import Cookie from 'js-cookie'
import cookie from 'cookie'
import auth from '../middleware/auth'
import Sidebar from 'react-sidebar'
import {useState, useEffect} from 'react'


//Importing Common components
import NavbarHome from '../components/navbar-home'
import FooterHome from '../components/footer-home'
import ProjectCard from '../components/project-card'

export default function Home({user,projects}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mql, setMql] = useState(true)
  // console.log("render:",projects)
  const token = Cookie.get('token')
  Cookie.set('name','user1')

  useEffect(() => {
    console.log('window.innerHeight', window.innerHeight);
    // const mql = window.matchMedia(`(min-width: 800px)`);
    console.log("mql: ", mql)
    setSidebarOpen(mql.matches)
  })
  
  
  const onSetSidebarOpen = (val) => {
    setSidebarOpen(val)
  }
  return (
      
      <div>
        <NavbarHome user={user}/>
        {/* <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={sidebarOpen}
          onSetOpen={onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          {!sidebarOpen && <button onClick={() => onSetSidebarOpen(!sidebarOpen)}>
            Open sidebar
          </button>}
        </Sidebar> */}
        {/* <main>
          
        </main> */}
        {/* <div className="body-container">
          <div className="sidebar-container">
            <div className="sidebar-box">
              <h3>Sidebar Content 1</h3>
            </div>
            <div className="sidebar-box">
              <h3>Sidebar Content 2</h3>
            </div>
            <div className="sidebar-box">
              <h3>Sidebar Content 2</h3>
            </div>
          </div>
          <div className="middle-container">
            {/* <h3>Project Card Trials</h3> */}
            {/* <div className="sidebar-box">
              <h3>Sidebar Content 2</h3>
            </div>
            <div className="sidebar-box">
              <h3>Sidebar Content 2</h3>
            </div> */}
            {/* {projects.map(project => <ProjectCard project={project} />)} */}
          {/* </div>
        </div> */}

        <div className="outermost-grid container-fluid">
          <div className="outermost-grid-row row">
            <div className="outermost-grid-column col-md-3 col-sm-12">Left Sidebar</div>
            <div className="outermost-grid-column col-md-6 col-sm-12">
              {projects.map(project => <ProjectCard project={project} />)}
            </div>
            <div className="outermost-grid-column col-md-3 col-sm-12">
              <div className="row idea-button-container justify-content-center">
                <Button onClick={() => Router.push('/timeline/idea-form')}> + Post an Idea</Button>
              </div>
            </div>
          </div>
        </div>
        
        <FooterHome />
        {/* Add a footer */}
        

        <style jsx>{`
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
                    .out
                    
                    // .body-container {
                    //   width: 100%
                    //   display: flex;
                    //   flex-flow: row nowrap;
                    //   border-style: double;
                    // }
                    // .sidebar-container  {
                    //     background-color: DodgerBlue;
                    //     width: 15%;
                    //     height = 900px;
                    //     display: flex;
                    //     flex-direction: column;
                    //     border-style: double;
                    // }
                    // .sidebar-box {
                    //   background-color: #f1f1f1;
                    //   // width: 100px;
                    //   margin: 10px;
                    //   text-align: center;
                    //   line-height: 75px;
                    //   font-size: 30px;
                    // }

                    // .body-container .middle-container {
                    //   // margin: auto;
                    //   border-style: double;
                    //   width: 50%;
                    //   display: flex;
                    // }
                    `} 
              </style>
              
        </div>

  )
}
  
export async function getServerSideProps(ctx){
  console.log("****************************************");
  const c = ctx.req.headers.cookie
  try {
    const res = await fetch("http://localhost:3000/api/project/get-project-data", {
      method:'GET',
      headers: {
          "Accept":'application/json',
          "Content-Type": "application/json",
      }
      })
    var {projects} = await res.json()
    
  } catch (error) {
    console.log("index pre-render", error)
  }
  // console.log("db query res:",projects)
  if(!c){
      return {
          props: {
            projects
          },
        }  
  }
  const {token} = cookie.parse(c)
  const {userId} = await auth(token)
  if(!userId){
      return {
          props: {
            projects
          },
        }  
  }

  return {
    props:{
      user: "user",
      projects
    }
  }
}

import Head from 'next/head'
import Link from 'next/link'
import 'react-bootstrap';
import {Button} from 'react-bootstrap'
import Router from 'next/router'
import Cookie from 'js-cookie'
import cookie from 'cookie'
import auth from '../middleware/auth'


//Importing Common components
import NavbarHome from '../components/layout/navbar-home'
import FooterHome from '../components/layout/footer-home'

export default function Home({user,projects}) {
  console.log("render:",projects)
  const token = Cookie.get('token')
  Cookie.set('name','user1')
  return (
      <div>
        <NavbarHome user={user}/>
        <div>
          <Link href="./user-pages/user-profile"><a>User Profile</a></Link>
        </div>
        <main>
          <Button onClick={() => Router.push('/timeline/idea-form')}> + Post an Idea</Button>
          <p>sjdjsd</p><p>sdjsd</p>
        </main>
        <div>
          <h3>project block</h3>
            {projects.map(project => (
              <ul key={project._id}>
                <li>{project.userId.username}</li>
                <li>{project.title}</li>
                <li>{project.shortDescription}</li>
                <li>{project.description}</li>
              </ul>
            ))}
        </div>

        {/* Add a footer */}
        <FooterHome />
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
  console.log("db query res:",projects)
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

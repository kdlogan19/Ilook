import NavbarHome from '../../components/navbar-home'
import FooterHome from '../../components/footer-home'
import ProjectCard from '../../components/project-card'

export default function Project({project}){
    return (
        <>
            {/* <NavbarHome user="Look"/> */}
    <h1>{project.title}</h1>
            {/* <FooterHome /> */}
        </>
    )
}

export async function getServerSideProps( {query, params}) {
    // Return a list of possible value for id
    try {
        const res = await fetch("http://localhost:3000/api/project/getProjectData", {
          method:'GET',
          headers: {
              "Accept":'application/json',
              "Content-Type": "application/json",
              "id": query.id
          }
          })
        var {project} = await res.json()
        
      } catch (error) {
        console.log("index pre-render", error)
      }
      console.log("db query res:",project)
    return {
        props:{
          project,
        }
      }
  }
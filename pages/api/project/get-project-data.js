import ProjectIdea from '../../../models/project-idea'
import dbconnect from '../../../middleware/dbconnect'

dbconnect()

export default async (req, res) => {
    const {method} = req
    if(method == "GET"){
        const projects = await ProjectIdea.getAllProjects()
        console.log("api:", projects)
        res.status(200).send({projects})
    }
}

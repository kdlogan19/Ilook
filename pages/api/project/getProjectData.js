import ProjectIdea from '../../../models/project-idea'
import dbconnect from '../../../middleware/dbconnect'

dbconnect()

export default async (req, res) => {
    const {method} = req
    if(method == "GET"){
        const project = await ProjectIdea.getProjectData(req.headers.id);
        // console.log("api:", projects)
        res.status(200).send({project})
    }
}

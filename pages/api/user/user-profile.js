import User from '../../../models/user'

export default async (req,res) => {
    const {method} = req
    console.log(req.headers);
    
    switch(method){
        case 'GET': 
            try {
                const userId = req.headers.userid
                console.log("updated req:",userId);
                const {project, firstName, middleName, lastName, email, username, gitProfile} = await User.findOne({'_id': userId})
                const user = {project, firstName, middleName, lastName, email, username, gitProfile}
                console.log("in auth: ",user);
                res.status(200).json({user})
            } catch (error) {
                console.log(error);
                res.status(404).json({error:true})
            }
            break;
        default: 
            res.status(404).json({error:true})
    }
}
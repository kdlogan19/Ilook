import dbConnect from '../../../middleware/dbconnect'
import User from '../../../models/user'

dbConnect();

export default async (req, res) => {
    const data = JSON.parse(req.body)
    const {method} = req;

    try {
        if(method === 'POST'){
            const {username, password} = data
            console.log("cool:", username);
            const user = await User.findByCredentials(username, password)
            // console.log("cool2",user);
            
            const token = await user.generateNewToken()    
            // console.log("cool3",token);   
            return res.send({user,token})
        }   
    } catch (error) {
        console.log("in login api Error", res.header, error);
        
        res.status(404).end()
    }
    
}
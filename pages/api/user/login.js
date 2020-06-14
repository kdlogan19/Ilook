import dbConnect from '../../../middleware/dbconnect'
import User from '../../../models/user'

dbConnect();

export default async (req, res) => {
    const data = JSON.parse(req.body)
    console.log("Inside login api",)
    const {method} = req;

    try {
        if(method === 'POST'){
            const {username, password} = data
            console.log("cool:", username);
            const user = await User.findByCredentials(username, password)
           
            res.status(200).json({success: true, data: user})
        }
    } catch (error) {
        console.log("in login api Error");
        
        res.status(404).json({success:false})
    }
    
}
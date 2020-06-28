import jwt from 'jsonwebtoken'
import User from '../../../models/user'
import dbConnect from '../../../middleware/dbconnect'

dbConnect();

const auth = async (req, res) => {
    try{    
        console.log("request in auth", req.headers);
            
        const token = req.headers.authorization.replace('Bearer ', '')
        console.log("token in auth",token);
        const decoded = jwt.verify(token, 'iamironman')
        console.log("decoded", decoded, token);                
        return res.status('200').send({userId: decoded._id})
    } catch(e) {
         res.status(401).send({error: true})
    }
}

export default auth;
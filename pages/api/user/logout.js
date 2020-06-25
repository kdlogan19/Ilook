import dbConnect from '../../../middleware/dbconnect'
import User from '../../../models/user'
import Cookies from 'js-cookie'
import cookie from 'cookie'

export default async (req,res) => {
    console.log("in logout",req.headers);
    const c = cookie.parse(req.headers.cookie) 
    console.log(c);
   
    try {
        Cookies.remove('token')
        res.status(200).end()
    } catch (error) {
        res.status(400).end()
    }
}
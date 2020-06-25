import dbconnect from '../../../middleware/dbconnect'
import User from '../../../models/user'

dbconnect()

export default async (req, res) => {
  const {method} = req;
  switch(method) {

    case 'GET':
        try {
          console.log("in the get request");
          const users = await User.find({});
          res.status(200).json({success: true, data: users})
        } catch {
          res.status(404).json({success: false})
        }
        break;
    
    case 'POST':
      try {
        const newUser = new User(req.body)
        console.log("in the post request", req.body);
        try {
          await newUser.save()
          const token = await newUser.generateNewToken()
          console.log("inside sign up:",newUser,"token:", token)
          res.status(201).send({newUser, token})
          }catch(err) {
              res.status(400).send(err)
          }
        } catch {
          res.status(404).json({success: false})
        }
        break;
    
    default:
      res.status(400).json({success: false})
      break;
  }
}

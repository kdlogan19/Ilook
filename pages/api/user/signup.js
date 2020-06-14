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
        await newUser.save()
        res.status(200).json({success: true, data: newUser})
      } catch {
        res.status(404).json({success: false})
      }
      break;
    
    default:
      res.status(400).json({success: false})
      break;
  }
}

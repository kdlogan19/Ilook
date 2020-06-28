import jwt from 'jsonwebtoken'
import User from '../models/user'

// const auth = async (token) => {
//     try{    
//         const authData = await fetch("http://localhost:3000/api/middleware/auth", {
//             method:'GET',
//             headers: {
//                 "Accept":'application/json',
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + token
//             }
//             })

//         const authDataJson = await authData.json()
//         return authDataJson
//     } catch(e) {
//         return false
//     }
// }

const auth = async (token) => {
    try{    
        console.log("request in auth", token);   
        const decoded = jwt.verify(token, 'iamironman')
        console.log("decoded", decoded, token);                
        return {userId: decoded._id}
    } catch(e) {
         return {error: true}
    }
}

export default auth;
import Link from 'next/link'
import React from 'react'
import NavbarHome from '../../components/layout/navbar-home'
import Cookies from 'js-cookie'
import cookie from 'cookie'
import auth from '../../middleware/auth'
// import auth from '../../middleware/auth'
import Router from 'next/router'

export default function userProfile({user}) {
    if(!user){
        return <div><NavbarHome /><div>Please Login First</div></div>
    }
    return (
        <div>
            <NavbarHome user={user} />
            <p>Inside User profile</p>
            <ul>
                {Object.keys(user).map((obj, i) => {
                    return (
                        <li>
                        {obj}:{user[obj]}
                        </li>
                    )})}

            </ul>
            
            <Link href="/"><a>Home Page</a></Link>
        </div>
    )
}

export async function getServerSideProps(ctx){
    console.log("*****************************************8");
    
    const {token} = cookie.parse(ctx.req.headers.cookie)
    const {userId} = await auth(token)
    if(!userId){
        return {
            props: {
            },
          }  
    }
    console.log(userId);
    
    const res = await fetch("http://localhost:3000/api/user/user-profile", {
                    method:'GET',
                    headers: {
                        "Accept":'application/json',
                        "Content-Type": "application/json",
                        "userId": userId
                    }
                    })
    const data = await res.json()

    if(data.error){
        return {
            props: {
            },
          }    }
    const user = data.user
    // console.log("profile-token",user, typeof(user))
   
    return {
        props: {
            user
        },
      }
}

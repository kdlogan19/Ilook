import Link from 'next/link'
import React from 'react'

import NavbarHome from '../../components/navbar-home'
import FooterHome from '../../components/footer-home'
import Cookies from 'js-cookie'
import cookie from 'cookie'
import auth from '../../middleware/auth'
// import auth from '../../middleware/auth'
import Router from 'next/router'
import { Card, Image } from 'react-bootstrap'
import {FaGithub} from 'react-icons/fa'

export default function userProfile({user}) {
    if(!user){
        return <div><NavbarHome /><div>Please Login First</div></div>
    }
    const git = user.gitProfile || ""
    console.log(user,typeof(user.gitProfile))
    return (
        <div>
            <NavbarHome user={user} />
            <h3>Inside User profile</h3>
            <div className="container">
                <div className="row basic-profile-box">
                    <div className="col profile-picture-box">
                        <div className="image fluid">
                            <Image src="../../assets/images/Profile_picture_dp.png" fluid />
                        {/* <img src="../../assets/images/Profile_picture_dp.png" alt="profile-picture"></img> */}
                        </div>
                        
                    </div>
                    <Card border="info" style={{ width: '54rem' }} className="col mx-auto">
                        <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                        <Card.Body>
                            <Card.Title>User-Description</Card.Title>
                            <Card.Text>
                                {/* {<Link to={user.gitProfile}> <FaGithub /> </Link>} */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                
            <br/>
            </div>
            
            <FooterHome />  
            <style jsx>{`
                .basic-profile-box {
                    height: 300px;
                }
                .profile-picture-box {
                    width: 20%;
                }
            `}</style>
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

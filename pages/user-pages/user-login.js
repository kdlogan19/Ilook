import {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Cookie from 'js-cookie'

import Navbar from '../../components/layout/navbar-home'

export default function userLogin() {
    const [form, setForm] = useState({username: '', password: ''})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("in the login:",form);
        try {
            
            const res = await fetch("http://localhost:3000/api/user/login", {
                    method:'POST',
                    header: {
                        "Accept":'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                    
                    })
            console.log("user-login res: ",res)
            const data = await res.json();
            console.log("in user-login",data);
            const {token} = data
            console.log("received:", token)
            Cookie.set('token', token)
            if(res.status == 404){
                throw new Error("page not found")
            }
            router.push('/')
        
        } catch (error) { 
            console.log("user-login error:",error);
            
        }
        
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    return (
        <div>
            <Navbar />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="username" onChange={handleChange} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="password" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <p> Haven't registered yet? <Link href="./user-signup"><a>SignUp</a></Link></p>
        </div>
    )
}

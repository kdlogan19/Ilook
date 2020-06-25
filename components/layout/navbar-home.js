import React from 'react'
import Head from 'next/head'
import {Navbar, Button, Nav, Form, FormControl, NavLink} from 'react-bootstrap';
import Cookies from 'js-cookie'
import {useRouter} from 'next/router'

export default function NavbarHome() {
    const router = useRouter()
    const logout = () => {
        Cookies.remove('token')
        router.push('/')
      }
    return (
        <>
            <Head>
                <title>Project Idea app</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />

            </Head>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Ilook</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/user-pages/user-profile">Profile</Nav.Link>
                    <Nav.Link href="#features">Timeline</Nav.Link>
    
                </Nav>
                <NavLink href="/user-pages/user-login">Login</NavLink>
                <NavLink onClick={logout}>Logout</NavLink>
    
            </Navbar>
            <br />
        </>
    )
}

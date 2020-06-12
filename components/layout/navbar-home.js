import React from 'react'
import Head from 'next/head'
import {Navbar, Button, Nav, Form, FormControl, NavLink} from 'react-bootstrap';


export default function NavbarHome() {
    return (
        <>
            <Head>
                <title>Project Idea app</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossorigin="anonymous"
                />
                <link rel="stylesheet" href="../../styles/global.css"></link>
            </Head>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <NavLink href="../../api/hello">Login</NavLink>
                <NavLink href="#">Logout</NavLink>
    
            </Navbar>
            <br />
        </>
    )
}

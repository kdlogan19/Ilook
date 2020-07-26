import React from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router';
import cookie from 'cookie' 

import Navbar from '../../components/navbar-home'
import auth from '../../middleware/auth'

import {Button, Col, Form, InputGroup} from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector'
import Link from 'next/link';

const constraint = yup.string().min(2,'Too Short').required('Required').trim()

const schema = yup.object({
    title: constraint,
    shortDescription: constraint,
    description: constraint,
    tags: yup.string().min(2,'Too Short').lowercase()
})

const dummy = {title: '', shortDescription: '',description: '',tags: ''}

export default function ideaForm({user, token}){
    if(!user){
        return <div><Navbar /><div>Please Login First</div></div>
    }
    return (<>
        <Navbar />
        <Formik 
            initialValues = {dummy}
            validationSchema ={schema}
            onSubmit = { async (values) => {
                values.token = token
                console.log("on submit event: ", values);
                try {
                    const res = await fetch('http://localhost:3000/api/project/idea-form', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                console.log("sent");
                
                } catch (error) {
                    console.log("Error occurred", error);
                    
                }
                Router.push('/')
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                isValid,
                errors,
            }) => (
               <Form noValidate onSubmit={handleSubmit}>
                   <Form.Group as={Col} md="4" controlId="validationFormikTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="write your project title"
                            value={values.title}
                            onChange={handleChange}
                            isInvalid={touched.title && !!errors.title}
                        />

                    <Form.Control.Feedback type="invalid"> {errors.title}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikShortDescription">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="shortDescription"
                            value={values.shortDescription}
                            onChange={handleChange}
                            isInvalid={touched.shortDescription && !!errors.shortDescription}
                        />

                    <Form.Control.Feedback type="invalid"> {errors.shortDescription}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            isInvalid={touched.description && !!errors.description}
                        />

                    <Form.Control.Feedback type="invalid"> {errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikTags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            type="text"
                            name="tags"
                            value={values.tags}
                            onChange={handleChange}
                            isInvalid={touched.tags && !!errors.tags}
                        />

                    <Form.Control.Feedback type="invalid"> {errors.tags}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" md="4">Submit form</Button>
               </Form>
            )}
        </Formik>
    </>)
}


export async function getServerSideProps(ctx){
    console.log("*****************************************");
    
    const {token} = cookie.parse(ctx.req.headers.cookie)
    const {userId} = await auth(token)
    if(!userId){
        return {
            props: {
            },
        }  
    }
    return {
        props: {
            user: "user",
            token
        },
      }
}
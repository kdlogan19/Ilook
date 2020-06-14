import React from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'
import fetch from 'isomorphic-unfetch'
import { useRouter, Router } from 'next/router';

import Navbar from '../../components/layout/navbar-home'

import {Button, Col, Form, InputGroup} from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector'
import Link from 'next/link';


const schema = yup.object({
    firstName: yup.string()
        .min(2,'Too Short')
        .required('Required')
        .trim(),
    middleName: yup.string()
        .trim(),
    lastName: yup.string()
        .min(2,'Too Short')
        .required('Required')
        .trim(),
    username: yup.string()
        .min(2,'Too Short')
        .required('Required')
        .trim(),
    password: yup.string()
        .min(8,'Too Short')
        .required('Required')
        .trim(),
    email: yup.string()
        .email('Please enter a valid email')
        .required('Required')
        .trim(),
    
    gitProfile: yup.string()
        .url('Enter a valid git profile'),
    
    terms: yup.boolean()
})


const dummy = {firstName:'',middleName:'', lastName:'',email:'', username:'',password:'', gitProfile:'', country:'', terms: 0}
export default function userSignup() {
    const router = useRouter()
    return (
        <>
        <Navbar />
        <Formik
            
            initialValues = {dummy}
            validationSchema ={schema}
            onSubmit = { async (values) => {

                console.log("on submit event: ", values);
                try {
                    const res = await fetch('http://localhost:3000/api/user/signup', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                router.push("/")
                } catch (error) {
                    console.log("Error occurred", error);
                    
                }
                
            }}
        >
            
             {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isInvalid={touched.firstName && !!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikk02">
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control
                        type="text"
                        name="middleName"
                        value={values.middleName}
                        onChange={handleChange}
                        isInvalid={touched.lastName && !!errors.middleName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.middleName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormik03">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={touched.lastName && !!errors.lastName}
                    />

                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>

                    
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={touched.username && !!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.username}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={touched.email && !!errors.email}
                        />

                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={touched.password && !!errors.password}
                        />

                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormikGit">
                        <Form.Label>Git</Form.Label>
                        <Form.Control
                            type="text"
                            name="gitProfile"
                            value={values.gitProfile}
                            onChange={handleChange}
                            isInvalid={touched.gitProfile && !!errors.gitProfile}
                        />

                    <Form.Control.Feedback type="invalid"> {errors.gitProfile}</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationFormikCountry">
                    <Form.Label>Country</Form.Label>
                    <CountryDropdown 
                        name="country" 
                            value={values.country}
                            onChange={(_, e) => handleChange(e)}
                            />
                
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check
                    required
                    name="terms"
                    label="Agree to terms and conditions"
                    value={values.terms = !errors.terms ? 1 : 0}
                    onChange={handleChange}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    id="validationFormik0"
                    />
                </Form.Group>
                <Button type="submit">Submit form</Button>
                </Form>
            )}
        </Formik>

        <p> Already have an account? <Link href="./user-login">Login</Link> </p>
        </>
    );
    }

    

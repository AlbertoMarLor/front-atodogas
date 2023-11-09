import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { Link, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';



export const FormularioLogin = () => {

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {

            const request = await fetch('http://localhost:3000/api/users/login', {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await request.json();
            if (data.status === "success") {
                localStorage.setItem("atodogastoken", data.token);
                localStorage.setItem("atodogasuser", JSON.stringify(data.user));

                setAuth(data.user)

                navigate('/home')
            }
        }
    })

    return (

        <Container>
            <div className="register-form">
                <h2>Iniciar sesión</h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={formik.values.email} onChange={formik.handleChange} name='email' />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={formik.values.password} onChange={formik.handleChange} name='password' />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Iniciar sesión
                    </Button>
                </Form>
                <p>No estoy registrado <Link>Registrarse</Link> </p>
            </div>
        </Container>
    );
}


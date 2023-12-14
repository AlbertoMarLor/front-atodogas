import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import { useCart } from '../context/cartProvider';



export const FormularioRegister = () => {

    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const { cart } = useCart();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit: async (values) => {

            const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/users/`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }

            })
            const data = await request.json();

            if (data.status === "success") {
                const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/users/login`, {
                    method: "POST",
                    body: JSON.stringify({ email: values.email, password: values.password }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await request.json();
                localStorage.setItem("atodogastoken", data.token);
                localStorage.setItem("atodogasuser", JSON.stringify(data.user));

                setAuth(data.user)

                if (cart.length > 0) {
                    return navigate('/cart')
                }
                navigate('/home')
            }

        }
    })

    return (

        <Container>
            <div className="register-form">
                <h2>Registrarse</h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control type="text" value={formik.values.username} onChange={formik.handleChange} name='username' />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={formik.values.email} onChange={formik.handleChange} name='email' />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={formik.values.password} onChange={formik.handleChange} name='password' />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Registrarse
                    </Button>
                </Form>
                <p >¿Ya tienes una cuenta? <Link to={'/login'}> Inicia sesión </Link> </p>
            </div>
        </Container>
    );
}


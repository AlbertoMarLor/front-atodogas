import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';




export const FormularioJoin = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_is8txfb', 'template_uoqa23n', form.current, "Dy_BmQl6XmwcN6TYe")
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };


    return (
        <Form style={{ marginTop: '40px', textAlign: 'start' }} ref={form} onSubmit={sendEmail}>
            <Form.Group className="mb-3" >
                <Form.Label>Tu nombre o el nombre de tu empresa</Form.Label>
                <Form.Control type="text" name='user_name' />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control type="number" name='phone' />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as={'textarea'} type="text" name='message' />
            </Form.Group>

            <Button variant="success" type="submit">
                Enviar
            </Button>
        </Form>
    );
}

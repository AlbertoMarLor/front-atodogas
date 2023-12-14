import React from 'react'
import { Container } from 'react-bootstrap'
import { FormularioJoin } from '../components/FormularioJoin'

export const Join = () => {
    return (
        <Container>
            <div className='join'>
                <div className="join-text">
                    <h2>¿Tienes un negocio, y te gustaría realizar repartos a domicilio?</h2>
                    <h2>¡Nosotros nos encargamos!</h2>

                    <h4>Llama a nuestro teléfono 603392557</h4>
                </div>
                <div className="join-form">
                    <h4>O escríbenos por aquí, ¡nos pondremos en contacto contigo lo antes posible!</h4>
                    <FormularioJoin />
                </div>
            </div>

        </Container>



    )
}

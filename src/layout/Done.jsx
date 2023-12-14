import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export const Done = () => {

    const navigate = useNavigate();

    return (
        <div className='done'>
            <h2>¡Tu pedido ha sido realizado!</h2>
            <p>En breves te llegará a la dirección que hayas indicado. Si tienes cualquier problema puedes llamar a 603392557</p>
            <Button onClick={() => navigate('/home')} className='great'>¡Genial!</Button>
        </div>
    )
}

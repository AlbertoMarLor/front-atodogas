import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { Schedule } from '../components/Schedule'
import ModalForm from '../components/Modal'
import { useParams } from 'react-router-dom'
import FormularioEdit from '../components/FormularioEdit'
import { Button } from 'react-bootstrap'

export const Negocio = () => {

    const { idNegocio } = useParams();
    const [business, setBusiness] = useState({});

    let user = {};
    if (localStorage.getItem("atodogasuser") !== null) {
        user = JSON.parse(localStorage.getItem("atodogasuser"))

    } else {
        user.role = 'regular'
    }


    const fetchData = async () => {
        const response = await fetch("https://back-atodogas.onrender.com/api/restaurants/" + idNegocio);
        const { data } = await response.json();
        setBusiness(data)
    }

    const deleteBusiness = async () => {
        const response = await fetch('https://back-atodogas.onrender.com/api/restaurants/' + idNegocio, {
            method: 'DELETE'
        })
        await response.json();
        //TODO no va el delete, a saber por que
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div className='hero-business'>
                <h2>{business.nombre}</h2>
                <p>Comida {business.type}</p>
            </div>

            <div className="business-grid">
                <div className="business-img">
                    <img src={business.img} alt="Tanuki San Japones imagen" />
                </div>
                <div className="business-menu">
                    {user.role === 'admin' &&
                        <ModalForm
                            color={"warning"}
                            title={"Editar negocio"}
                            buttonText={"Editar"}
                            formulario={<FormularioEdit business={business} />}
                        />}

                    <Menu />
                    {user.role === 'admin' &&
                        <Button
                            variant='danger'
                            onClick={deleteBusiness}
                        >
                            Eliminar
                        </Button>
                    }

                </div>
                <div className="business-schedule"></div>
                <Schedule />
            </div>

        </div>
    )
}

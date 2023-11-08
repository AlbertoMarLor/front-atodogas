import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { Schedule } from '../components/Schedule'
import ModalForm from '../components/Modal'
import { useParams } from 'react-router-dom'
import FormularioEdit from '../components/FormularioEdit'

export const Negocio = () => {

    const { idNegocio } = useParams();
    const [business, setBusiness] = useState({});

    const fetchData = async () => {
        const response = await fetch("https://back-atodogas.onrender.com/api/restaurants/" + idNegocio);
        const { data } = await response.json();
        setBusiness(data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div className='hero-business'>
                <h2>{business.nombre}</h2>
                <p>Comida Japonesa</p>
            </div>

            <div className="business-grid">
                <div className="business-img">
                    <img src={business.img} alt="Tanuki San Japones imagen" />
                </div>
                <div className="business-menu">
                    <ModalForm
                        color={"warning"}
                        title={"Editar negocio"}
                        buttonText={"Editar"}
                        formulario={<FormularioEdit business={business} />}
                    />
                    <Menu />
                </div>
                <div className="business-schedule"></div>
                <Schedule />
            </div>

        </div>
    )
}

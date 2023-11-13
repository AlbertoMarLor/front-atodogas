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

    useEffect(() => {
        background(business.type);
    }, [business])


    let user = {};
    if (localStorage.getItem("atodogasuser") !== null) {
        user = JSON.parse(localStorage.getItem("atodogasuser"))

    } else {
        user.role = 'regular'
    }

    const background = (type) => {
        const backgroundDiv = document.getElementById("backGround");
        let imageUrl;

        switch (type) {
            case 'italiana':
                imageUrl = 'url(/src/assets/italiana.jpg)';
                break;
            case 'china':
                imageUrl = 'url(/src/assets/china.jpg)';
                break;
            case 'mediterránea':
                imageUrl = 'url(/src/assets/mediterranea.jpg)';
                break;
            case 'japonesa':
                imageUrl = 'url(/src/assets/ramen.jpg)';
                break;
            case 'all':
                imageUrl = 'url(/src/assets/all.jpg)';
                break;
            case 'no-type':
                imageUrl = 'url(/src/assets/all.jpg)';
                break;
            default:
                imageUrl = 'url(/src/assets/all.jpg)'
        }


        backgroundDiv.style.backgroundImage = imageUrl;

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
            <div className='hero-business' id='backGround'>
                <h2>{business.nombre}</h2>
                <p>
                    {
                        (business.type === 'all' || business.type === 'no-type') ?
                            ''
                            :
                            `Comida ${business.type}`
                    }

                </p>
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

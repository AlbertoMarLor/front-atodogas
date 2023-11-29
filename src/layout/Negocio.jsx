import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { Schedule } from '../components/Schedule'
import ModalForm from '../components/ModalForm'
import { useParams } from 'react-router-dom'
import FormularioEdit from '../components/FormularioEdit'
import { Button } from 'react-bootstrap'
import { MiniCart } from '../components/MiniCart'
import { Footer } from '../layout/Footer'



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
                imageUrl = 'url(https://i.postimg.cc/QCLxBmZg/italiana.jpg)';
                break;
            case 'china':
                imageUrl = 'url(https://i.postimg.cc/8chkLvT2/china.jpg)';
                break;
            case 'mediterránea':
                imageUrl = 'url(https://i.postimg.cc/XNFYRR9s/mediterranea.jpg)';
                break;
            case 'japonesa':
                imageUrl = 'url(https://i.postimg.cc/jdbStMXt/ramen.jpg)';
                break;
            case 'all':
                imageUrl = 'url(https://i.postimg.cc/FKBKvmPB/all.jpg)';
                break;
            case 'no-type':
                imageUrl = 'url(https://i.postimg.cc/FKBKvmPB/all.jpg)';
                break;
            default:
                imageUrl = 'url(https://i.postimg.cc/FKBKvmPB/all.jpg)'
        }


        backgroundDiv.style.backgroundImage = imageUrl;

    }


    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/restaurants/one/` + idNegocio);
        const { data } = await response.json();
        setBusiness(data)

    }

    const deleteBusiness = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/restaurants/` + idNegocio, {
            method: 'DELETE'
        })
        await response.json();

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
            {business && business.menu &&
                <div>

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
                                    component={<FormularioEdit business={business} />}
                                />}
                            <Menu business={business} />
                            {user.role === 'admin' &&
                                <Button
                                    variant='danger'
                                    onClick={deleteBusiness}
                                >
                                    Eliminar
                                </Button>
                            }

                        </div>
                        <MiniCart />
                        <div className="business-schedule"></div>
                        <Schedule />
                    </div>
                </div>

            }
            <Footer />

        </div>
    )
}

import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { Schedule } from '../components/Schedule'
import ModalForm from '../components/ModalForm'
import { useNavigate, useParams } from 'react-router-dom'
import FormularioEdit from '../components/FormularioEdit'
import { Button } from 'react-bootstrap'
import { MiniCart } from '../components/MiniCart'
import { Footer } from '../layout/Footer'
import { FaArrowLeft } from "react-icons/fa6";
import Swal from 'sweetalert2'



export const Negocio = () => {

    const { idNegocio } = useParams();
    const [business, setBusiness] = useState({});
    const navigate = useNavigate();

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
            case 'pizzeria':
                imageUrl = 'url(https://i.postimg.cc/KvHprFZB/pizzeria.jpg)';
                break;
            case 'burger':
                imageUrl = 'url(https://i.postimg.cc/9FZ1T9n5/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg)';
                break;
            case 'polleria':
                imageUrl = 'url(https://i.postimg.cc/qvgRScVW/pollo-asado-citricos-1920.webp)';
                break;
            case 'kebab':
                imageUrl = 'url(https://i.postimg.cc/D0mHnzvf/kebab.webp)';
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

        Swal.fire({
            title: "¿Borrar restaurante?",
            text: "¡Esto es irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1e9522",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, bórralo"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado",
                    text: "El restaurante ha sido eliminado",
                    icon: "success"
                });

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/restaurants/` + idNegocio, {
                    method: 'DELETE'
                })
                await response.json();

            }
            else {
                return;
            }
        });
    }

    useEffect(() => {
        fetchData();

    }, [])

    return (
        <div>
            <div className='hero-business' id='backGround'>


                <h2>{business.nombre}</h2>

            </div>

            <FaArrowLeft className='leftArrow' onClick={() => { navigate('/home') }} />

            {business && business.menu &&
                <div>

                    <div className="business-grid">
                        <div className="business-img">
                            <img src={business.img} alt={business.nombre} />
                        </div>
                        <div className="business-menu">
                            {user.role === 'admin' &&
                                <ModalForm
                                    color={"warning"}
                                    title={"Editar negocio"}
                                    buttonText={"Editar menús/platos"}
                                    component={<FormularioEdit business={business} />}
                                />}

                            <Menu business={business} />
                            {user.role === 'admin' &&
                                <Button
                                    variant='danger'
                                    onClick={deleteBusiness}
                                    style={{ marginBottom: "30px" }}
                                >
                                    Eliminar restaurante
                                </Button>
                            }

                        </div>
                        <MiniCart />
                        <div className="business-schedule">
                            <Schedule idNegocio={idNegocio} user={user} />
                        </div>
                    </div>
                </div>

            }
            <Footer />

        </div>
    )
}

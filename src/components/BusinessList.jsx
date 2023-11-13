import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ModalForm from './Modal'
import FormularioNew from './FormularioNew';


export const BusinessList = () => {

    const [restaurants, setRestaurants] = useState([]);

    let user = {};
    if (localStorage.getItem("atodogasuser") !== null) {
        user = JSON.parse(localStorage.getItem("atodogasuser"))

    } else {
        user.role = 'regular'
    }


    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/restaurants`);
        const data = await response.json();
        setRestaurants(data.data)
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            <Container>
                <section className='hero-section'>
                    {user.role === 'admin' &&
                        <ModalForm
                            color={"success"}
                            title={"Nuevo negocio"}
                            buttonText={"Nuevo"}
                            formulario={<FormularioNew />}
                        />}

                    <h2 className='hero-h2'>Restaurantes</h2>
                    <div className="article-grid">
                        {restaurants.map(restaurant => {
                            return (

                                <Link key={restaurant._id} to={`/negocio/${restaurant._id}`} style={{ textDecoration: 'none' }}>
                                    <article>
                                        <h3>{restaurant.nombre}</h3>
                                        <img src={restaurant.img} alt={restaurant.nombre} />
                                        <p>Comida Japonesa</p>
                                    </article>
                                </Link>
                            )
                        })}


                    </div>
                </section>

                <section>
                    <h2>Desavios</h2>
                    <div className="article-grid">
                        <article>
                            <h3>Tanuki San Japones</h3>
                            <img src="src\assets\tanuki.png" alt="Tanuki San Japones" />
                            <p>Comida Japonesa</p>
                        </article>
                        <article>
                            <h3>Paellamar</h3>
                            <img src="src\assets\tanuki.png" alt="Tanuki San Japones" />
                            <p>Comida Mediterranea</p>
                        </article>
                    </div>
                </section>
            </Container >
        </>
    )
}

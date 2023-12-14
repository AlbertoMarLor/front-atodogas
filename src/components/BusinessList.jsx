import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ModalForm from './ModalForm'
import FormularioNew from './FormularioNew';
import { Search } from './Search';
/* import { Filter } from './Filter'; */
import { Footer } from '../layout/Footer'


export const BusinessList = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    /* const [filter, setFilter] = useState(""); */
    const [noResults, setNoResults] = useState(false);

    let user = {};
    if (localStorage.getItem("atodogasuser") !== null) {
        user = JSON.parse(localStorage.getItem("atodogasuser"))

    } else {
        user.role = 'regular'
    }


    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/restaurants/${search}`);
        const { data } = await response.json();
        setRestaurants(data);
        setNoResults(data.length === 0);
    }

    /*  const filteredRestaurants = restaurants.filter((restaurant) => {
         return filter === "" || restaurant.type === filter;
     }) */


    useEffect(() => {
        fetchData();
    }, [search])


    return (
        <>
            <Container>
                <section className='hero-section'>
                    {user.role === 'admin' &&
                        <ModalForm
                            color={"success"}
                            title={"Nuevo negocio"}
                            buttonText={"Nuevo"}
                            component={<FormularioNew />}
                        />}
                    <div className="filters-grid">
                        <Search search={search} setSearch={setSearch} fetchData={fetchData} />
                        {/*     <Filter setFilter={setFilter} /> */}

                    </div>

                    <h2 className='hero-h2'>Restaurantes</h2>

                    <h3 style={{ color: "grey", fontSize: "14px", marginBottom: "-30px" }}>Todos los pagos se realizan en efectivo al repartidor</h3>
                    <h3 style={{ color: "grey", fontSize: "14px" }}>Solo envíos a Lepe, Cartaya, Islantilla, La Antilla y Urbasur</h3>

                    {noResults && <p>No tenemos restaurantes con ese nombre</p>}

                    <div className="article-grid">
                        {restaurants.map(restaurant => {
                            return (

                                <Link key={restaurant._id} to={`/negocio/${restaurant._id}`} style={{ textDecoration: 'none' }}>
                                    <article>
                                        <h3>{restaurant.nombre}</h3>
                                        <img src={restaurant.img} alt={restaurant.nombre} />
                                        <p>{restaurant.type.toUpperCase()}</p>
                                    </article>
                                </Link>
                            )
                        })}


                    </div>
                </section>
            </Container >
            <Footer />
        </>
    )
}

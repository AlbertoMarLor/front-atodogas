import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaPhoneAlt } from 'react-icons/fa'




export const Header = () => {

    const [user, setUser] = useState({});
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('atodogasuser')))
    }, [auth])

    const logout = () => {
        localStorage.clear();
        setAuth("");
        navigate('/login');
    }


    return (
        <div>
            <header>
                <Container>
                    <Navbar expand="lg" className="navbar navbar-expand-lg navbar-light shadow-5-strong">
                        <Link to={'/home'}>  <Navbar.Brand className='logo-div' > <img className='logo' src="https://i.postimg.cc/rFyt6XqF/logo2.png" alt="atodogas logo" />
                        </Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" style={{ fontFamily: "revert", fontWeight: "500", width: '75%' }}>

                                {user ? (
                                    <>
                                        <Nav.Link as={Link} className='header-text' to={'/register'} >Hola {user.username}</Nav.Link>
                                        <Nav.Link className='header-text' onClick={logout} >Cerrar sesión</Nav.Link>
                                    </>
                                ) :
                                    (<>
                                        <Nav.Link as={Link} className='header-text' to={'/register'} >REGISTRARSE</Nav.Link>
                                        <Nav.Link as={Link} className='header-text' to={'/login'}>INICIAR SESIÓN</Nav.Link>
                                    </>
                                    )
                                }
                                <Nav.Link className='header-text'><FaPhoneAlt style={{ marginRight: "5px" }}></FaPhoneAlt>664320649</Nav.Link>


                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>
                </Container>
            </header>
        </div>
    )
}

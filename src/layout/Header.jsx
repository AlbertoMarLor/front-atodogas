import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import { FaPhone } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div>
            <header>
                <Container>
                    <Navbar expand="lg" className="navbar navbar-expand-lg navbar-light shadow-5-strong">
                        <Link to={'/home'}>  <Navbar.Brand className='logo-div' >  <img className='logo' src="/public/images/logo2.png" alt="atodogas logo" />
                        </Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" style={{ fontFamily: "revert", fontWeight: "500", width: '75%' }}>
                                <Nav.Link className='header-text' href="#home">REGISTRARSE</Nav.Link>
                                <Nav.Link className='header-text' href="#link">INICIAR SESIÓN</Nav.Link>
                                <Nav.Link className='header-text' href="#link">CATEGORÍAS</Nav.Link>
                                <Nav.Link className='header-text' href="#link"> <FaPhone /> 664320649</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>
                </Container>
            </header>
        </div>
    )
}

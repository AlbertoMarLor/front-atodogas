import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Header } from '../layout/Header'
import { Hero } from '../layout/Hero'
import { Negocio } from '../layout/Negocio'
import { FormularioRegister } from '../layout/FormularioRegister'
import { FormularioLogin } from '../layout/FormularioLogin'
import { AuthProvider } from '../context/AuthProvider'
import { Join } from '../layout/Join'
import { CartProvider } from '../context/cartProvider'
import { Cart } from '../layout/Cart'

//TODO ojo aqui otra vez la mierda de las mayusculas y minusculas
export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Navigate to={"/home"} />} />
                        <Route path="/home" element={<Hero />} />
                        <Route path="/negocio/:idNegocio" element={<Negocio />} />
                        <Route path="/register" element={<FormularioRegister />} />
                        <Route path="/login" element={<FormularioLogin />} />
                        <Route path="/join" element={<Join />} />
                        <Route path="/cart" element={<Cart />} />

                    </Routes>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

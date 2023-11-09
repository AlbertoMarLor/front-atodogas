import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Header } from '../layout/Header'
import { Hero } from '../layout/Hero'
import { Negocio } from '../layout/Negocio'
import { FormularioRegister } from '../layout/FormularioRegister'
import { FormularioLogin } from '../layout/FormularioLogin'
import { AuthProvider } from '../context/authProvider'

export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to={"/home"} />} />
                    <Route path="/home" element={<Hero />} />
                    <Route path="/negocio/:idNegocio" element={<Negocio />} />
                    <Route path="/register" element={<FormularioRegister />} />
                    <Route path="/login" element={<FormularioLogin />} />


                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

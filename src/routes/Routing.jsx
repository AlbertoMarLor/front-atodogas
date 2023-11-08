import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Header } from '../layout/Header'
import { Hero } from '../layout/Hero'
import { Negocio } from '../layout/Negocio'

export const Routing = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to={"/home"} />} />
                <Route path="/home" element={<Hero />} />
                <Route path="/negocio/:idNegocio" element={<Negocio />} />

            </Routes>
        </BrowserRouter>
    )
}

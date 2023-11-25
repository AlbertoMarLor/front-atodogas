import React from 'react'
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";



export const Footer = () => {



    return (
        <footer>
            <h2>atodogas</h2>
            <p>Repartos a domicilio en la costa de Huelva (Lepe, Cartaya, Islantilla, La Antilla, Urbasur)</p>
            <a href="https://albmarlor-web.onrender.com/inicio">Web</a>
            <h3>Social Media</h3>
            <div className="social">
                <a target='_blank' href="https://www.instagram.com/atodogaslepe/"><FaInstagram /></a>
                <a target='_blank' href="https://www.tiktok.com/@atodogaslepe?lang=es"> <FaTiktok /></a>
                <a target='_blank' href="https://www.facebook.com/atodogaslepe"> <FaFacebook /></a>
                <a target='_blank' href="mailto:atodogaslepe@gmail.com"> <SiGmail /></a>
            </div>
        </footer>
    )
}

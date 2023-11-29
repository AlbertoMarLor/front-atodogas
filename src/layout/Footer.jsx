import React from 'react'
import { FaInstagram, FaTiktok, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaPhone } from 'react-icons/fa'


export const Footer = () => {



    return (
        <footer>
            <div >
                <h2>atodogas</h2>
                <p>Repartos a domicilio en la costa de Huelva (Lepe, Cartaya, Islantilla, La Antilla, Urbasur)</p>
                <a href="https://albmarlor-web.onrender.com/inicio">Web</a>

            </div>
            <div>
                <h3>Social Media</h3>
                <div className="social">
                    <a target='_blank' href="https://www.instagram.com/atodogaslepe/"><FaInstagram /></a>
                    <a target='_blank' href="https://www.tiktok.com/@atodogaslepe?lang=es"> <FaTiktok /></a>
                    <a target='_blank' href="https://www.facebook.com/atodogaslepe"> <FaFacebook /></a>
                </div>

            </div>
            <div >
                <h3>Contacto</h3>
                <div className='footer phone'>
                    <FaPhoneAlt></FaPhoneAlt>
                    <strong>664320649</strong>
                </div>
                <a target='_blank' href="mailto:atodogaslepe@gmail.com"> <SiGmail /> atodogaslepe@gmail.com</a>

            </div>
            <div >
                <h3>Horario pedidos</h3>
                <p>Todos los días, de <b>12:30</b> a <b>00:30</b></p>
            </div>
        </footer>
    )
}

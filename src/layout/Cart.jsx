import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/cartProvider';
import { FaRegTrashAlt } from "react-icons/fa";
import { Button, Form } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";


export const Cart = () => {
    const { cart, dispatch } = useCart();
    const navigate = useNavigate();


    let direction = "";
    if (localStorage.getItem("atodogasdir") !== null) {
        direction = localStorage.getItem("atodogasdir")
    }

    let phone = "";
    if (localStorage.getItem("atodogasphone") !== null) {
        phone = localStorage.getItem("atodogasphone")
    }

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_PRODUCT', id });
        location.reload();
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    };

    const products = JSON.parse(localStorage.getItem('atodogascart')) || [];

    const pricesSum = products.reduce((sum, product) => sum + parseFloat(product.price), 0) + 3


    const sendEmail = (e) => {
        e.preventDefault();
        localStorage.setItem("atodogasdir", e.target.direction.value);
        const direction = localStorage.getItem("atodogasdir");

        localStorage.setItem("atodogasphone", e.target.phone.value);
        const phone = localStorage.getItem("atodogasphone");

        const comments = e.target.comments.value;

        const productsString = cart.map(product => (
            `Producto: ${product.name}, Cantidad: ${product.quantity}, Precio: ${product.price}€, Restaurante: ${product.business}`
        )).join('\n');

        const emailBody = `PEDIDO:\n${productsString}\n\nTotal: ${pricesSum.toFixed(2)}€\n\nTeléfono: ${phone}\n\nDirección: ${direction}\n\nComentarios: ${comments}`;

        if (!direction || !phone) {
            return alert("Debes poner tu dirección y tu número de teléfono")
        }

        emailjs.send('service_9hxtqhi', 'template_uoqa23n', { message: emailBody }, "Dy_BmQl6XmwcN6TYe")
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });


        clearCart();

        navigate('/done');
    };


    return (
        <div className='cart'>
            <div className="cart h2">
                <h3>Tu pedido</h3>
            </div>

            <FaArrowLeft className='cart leftArrow' onClick={() => history.back()} />

            {cart.map((product) => (
                <div className='oneProduct' key={product.id}>
                    <div className="nameNQuantity">
                        <p>{product.quantity}</p>
                        <p>{product.name}</p>
                    </div>
                    <div className="cartPrice">
                        <FaRegTrashAlt onClick={() => removeFromCart(product.id)} color='tomato' />
                        <p>{product.price}€</p>
                    </div>

                </div>
            ))}
            <div className="envio">
                <strong >+ 3€ transporte a domicilio. Todos los pagos en efectivo al repartidor</strong>
            </div>


            <Form className='cart form' onSubmit={sendEmail}>
                <Form.Group className="mb-3" >
                    <Form.Label>Tu dirección*</Form.Label>
                    <Form.Control defaultValue={direction} placeholder='¿Donde te lo llevamos?' type="text" name='direction' />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Tu teléfono*</Form.Label>
                    <Form.Control defaultValue={phone} placeholder='603392557' type="text" name='phone' />
                </Form.Group>
                <small>*No nos quedamos con los datos de tu teléfono ni tu dirección, sólo con tu correo</small>
                <Form.Group className="mb-3" >
                    <Form.Label >Comentarios</Form.Label>
                    <Form.Control style={{ width: "225px" }} as={"textarea"} placeholder='¿Algo que necesitemos saber del pedido?' type="text" name='comments' />
                </Form.Group>


                <button type='submit' className="quantity total">
                    <p>Realizar pedido</p>
                    <p>{(Math.floor(parseFloat(pricesSum) * 100) / 100).toFixed(2)}€</p>

                </button>

            </Form>

        </div>
    );
};


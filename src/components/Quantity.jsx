import React, { useState } from 'react'
import { useCart } from '../context/cartProvider';


export const Quantity = ({ business, id, name, price, handleClose }) => {

    const [quantity, setQuantity] = useState(1);

    const { dispatch } = useCart();


    const substract = () => {
        setQuantity(quantity - 1)
        if (quantity === 1) {
            setQuantity(1)
        }
    }

    const add = () => {
        setQuantity(quantity + 1)
    }

    const addToCart = (business, id, name, quantity, price) => {
        const product = {
            business,
            id,
            name,
            quantity,
            price
        }

        dispatch({ type: 'ADD_PRODUCT', product });
        handleClose();
    }

    return (
        <>

            <div className='quantity'>

                <div className="quantity text">
                    <strong>{name}</strong>
                    <p>{price} €</p>
                </div>

                <div className="quantity sum">
                    <p className='operator' onClick={substract}>-</p>
                    <p className='number'>{quantity}</p>
                    <p className='operator' onClick={add}>+</p>
                </div>
                <div onClick={() => addToCart(business, id, name, quantity, (Math.floor(parseFloat(price * quantity) * 100) / 100).toFixed(2))} className="quantity total">
                    <div className='pedido'>
                        <p>Añadir al pedido</p>
                    </div>
                    <div className='precio'>
                        <p>{(Math.floor(parseFloat(price * quantity) * 100) / 100).toFixed(2)}€</p>
                    </div>
                </div>

            </div>
        </>
    )
}

import React, { useEffect, useState } from 'react';
import { FaShoppingBasket } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartProvider';


export const MiniCart = () => {

    const { cart } = useCart();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProducts(cart)
    }, [cart])


    const pricesSum = products.reduce((sum, product) => sum + parseFloat(product.price), 0) + 3
    const productsLength = products.reduce((sum, product) => sum + parseFloat(product.quantity), 0)


    return (
        <div className={products.length > 0 ? "minicart show" : "minicart hidden"} onClick={() => navigate('/cart')}>
            <div className="basketIconDiv">
                <FaShoppingBasket />
            </div>
            <div className="basketPrice">
                <strong>{pricesSum}€</strong>
                <p>Ir al pedido</p>
            </div>
            <div className="circle">
                <strong>{productsLength}</strong>
            </div>
        </div>
    )
}

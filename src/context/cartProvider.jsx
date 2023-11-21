import React, { createContext, useReducer, useEffect, useContext } from 'react'

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return [...state, action.product];
        case 'REMOVE_PRODUCT':
            return state.filter((product => product.id !== action.id));
        case 'CLEAR_CART':
            return [];
        default:
            return state;


    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const saveCart = localStorage.getItem('atodogascart');
        return saveCart ? JSON.parse(saveCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('atodogascart', JSON.stringify(cart));
    }, [cart])

    return (
        <CartContext.Provider
            value={{ cart, dispatch }}
        >
            {children}
        </CartContext.Provider>
    );

};
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

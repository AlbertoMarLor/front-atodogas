import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ModalQuantity from './ModalQuantity';
import { Quantity } from './Quantity';

function Menu({ business }) {
    const [modalStates, setModalStates] = useState(() => {

        return business.menu.map(menuItem => Array(menuItem.dishes.length).fill(false));
    });


    const handleShow = (menuIndex, dishIndex) => {
        const newModalStates = [...modalStates];
        newModalStates[menuIndex] = [...modalStates[menuIndex]];
        newModalStates[menuIndex][dishIndex] = true;
        setModalStates(newModalStates);
    };

    const handleClose = (menuIndex, dishIndex) => {
        const newModalStates = [...modalStates];
        newModalStates[menuIndex] = [...modalStates[menuIndex]];
        newModalStates[menuIndex][dishIndex] = false;
        setModalStates(newModalStates);
    };

    return (
        <>
            <Accordion bsPrefix='accordion' defaultActiveKey="0">
                {business.menu.map((menuItem, menuIndex) => (
                    <Accordion.Item eventKey={menuIndex} key={menuItem.menuName}>
                        <Accordion.Header bsPrefix='acc-header'>{menuItem.menuName}</Accordion.Header>
                        {menuItem.dishes.map((dish, dishIndex) => (
                            <React.Fragment key={dish._id}>
                                <Accordion.Body bsPrefix='acc-body'>
                                    <div onClick={() => handleShow(menuIndex, dishIndex)} className="box">
                                        <div className="plato-box">
                                            <p className='plato'>{dish.name}</p>
                                        </div>
                                        {dish.price && (
                                            <p className='price'>{dish.price} €</p>
                                        )}
                                    </div>
                                </Accordion.Body>
                                <ModalQuantity
                                    show={modalStates[menuIndex][dishIndex]}
                                    setShow={() => handleShow(menuIndex, dishIndex)}
                                    handleClose={() => handleClose(menuIndex, dishIndex)}
                                    component={<Quantity business={business.nombre} id={dish._id} name={dish.name} price={dish.price} />}
                                />
                            </React.Fragment>
                        ))}
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    );
}

export default Menu;

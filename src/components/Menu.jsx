import Accordion from 'react-bootstrap/Accordion';

function Menu({ business }) {


    return (
        <Accordion bsPrefix='accordion' defaultActiveKey="0">
            {business.menu.map((menuItem, index) => (
                <Accordion.Item eventKey={index} key={menuItem.menuName}>
                    <Accordion.Header bsPrefix='acc-header'>{menuItem.menuName}</Accordion.Header>
                    {menuItem.dishes.map(dish => (
                        <Accordion.Body bsPrefix='acc-body' key={dish.name}>
                            <div className="box">
                                <div className="plato-box">
                                    <p className='plato'>{dish.name}</p>
                                </div>
                                {dish.price && (
                                    <p className='price'>{dish.price} €</p>
                                )}
                            </div>

                        </Accordion.Body>
                    ))}

                </Accordion.Item>
            ))}

        </Accordion>);
}

export default Menu;
import Accordion from 'react-bootstrap/Accordion';

function Menu() {
    return (
        <Accordion bsPrefix='accordion' defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header bsPrefix='acc-header'>Entrantes</Accordion.Header>
                <Accordion.Body bsPrefix='acc-body'>
                    <div className="box">
                        <div className="plato-box">
                            <p className='plato'>Ensalada Wakame</p>
                            <p className='ingredients'> <span > Ingredientes:</span> Hamburguesa de ternera con queso, cebolla, bacon, huevo, ketchup </p>
                        </div>
                        <p className='price'>4.05</p>
                    </div>

                    <div className="box">
                        <div className="plato-box">
                            <p className='plato'>Edamame</p>
                            <p className='ingredients'> <span > Ingredientes:</span> Verdura Edamame, sal, azucar, vinagre </p>
                        </div>
                        <p className='price'>2.45</p>
                    </div>

                    <div className="box">
                        <div className="plato-box">
                            <p className='plato'>Alitas de pollo rebozadas, 6 unidades</p>
                        </div>
                        <p className='price'>5.90</p>
                    </div>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header bsPrefix='acc-header'>Platos principales</Accordion.Header>
                <Accordion.Body bsPrefix='acc-body'>
                    <div className="box">
                        <p className='plato'>Arroz frito</p><p className='price'>4.90</p>
                    </div>
                    <div className="box">
                        <p className='plato'>Arroz combinado con langostinos Wakame</p><p className='price'>8.90</p>
                    </div>
                    <div className="box">
                        <p className='plato'>Pollo con salsa Teriyaki</p> <p className='price'>6.95</p>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default Menu;
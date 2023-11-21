import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalQuantity({ component, show, handleClose }) {


    return (
        <>


            <Modal className='modalQuantity' show={show} onHide={handleClose}>
                <Button
                    className='quantity-button'
                    onClick={handleClose}
                >X</Button>
                <Modal.Body>{component}</Modal.Body>

            </Modal>
        </>
    );
}

export default ModalQuantity;
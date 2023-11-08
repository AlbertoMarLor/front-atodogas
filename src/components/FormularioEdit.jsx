import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormularioEdit({ business }) {


    const formik = useFormik({
        initialValues: {
            nombre: business.nombre,
            img: business.img
        },
        onSubmit: async (values) => {

            await fetch('https://back-atodogas.onrender.com/api/restaurants/' + business._id, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }

            })

        }
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tanuki San Japones" value={formik.values.nombre} onChange={formik.handleChange} name='nombre' />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="text" placeholder="https://..." value={formik.values.img} onChange={formik.handleChange} name='img' />
            </Form.Group>
            <Button variant="primary" type="submit">
                Añadir
            </Button>
        </Form>
    );
}

export default FormularioEdit;
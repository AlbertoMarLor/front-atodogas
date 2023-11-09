import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormularioNew() {

    const formik = useFormik({
        initialValues: {
            nombre: "",
            img: "",
            type: ""
        },
        onSubmit: async (values, { resetForm }) => {

            const data = await fetch('http://localhost:3000/api/restaurants/', {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }

            })
            console.log(values);
            console.log(await data.json());

            resetForm();
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
            <Form.Group className="mb-3" >
                <Form.Label>Tipo de comida</Form.Label>
                <Form.Select value={formik.values.type} onChange={formik.handleChange} name='type'>
                    <option value="all">De todo un poco</option>
                    <option value="mediterránea">Mediterránea</option>
                    <option value="japonesa">Japonesa</option>
                    <option value="italiana">Italiana</option>
                    <option value="china">China</option>
                    <option value="no-type">Sin tipo</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Añadir
            </Button>
        </Form>
    );
}

export default FormularioNew;
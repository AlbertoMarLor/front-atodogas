import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';


export const EditSchedule = ({ schedule, idNegocio }) => {

    const formik = useFormik({
        initialValues: {

            Monday: schedule.Monday,
            Tuesday: schedule.Tuesday,
            Wednesday: schedule.Wednesday,
            Thursday: schedule.Thursday,
            Friday: schedule.Friday,
            Saturday: schedule.Saturday,
            Sunday: schedule.Sunday
        },
        onSubmit: async (values) => {

            values = { schedule: values }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/schedule/${idNegocio}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })

            const data = await response.json();
            console.log(idNegocio, data)

        }
    })

    return (
        <div className='EditScheduleForm'>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>Lunes</Form.Label>
                    <Form.Control value={formik.values.Monday} onChange={formik.handleChange} type='text' name='Monday' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Martes</Form.Label>
                    <Form.Control value={formik.values.Tuesday} onChange={formik.handleChange} type='text' name='Tuesday' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Miércoles</Form.Label>
                    <Form.Control value={formik.values.Wednesday} onChange={formik.handleChange} type='text' name='Wednesday' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Jueves</Form.Label>
                    <Form.Control value={formik.values.Thursday} onChange={formik.handleChange} type='text' name='Thursday' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Viernes</Form.Label>
                    <Form.Control value={formik.values.Friday} onChange={formik.handleChange} type='text' name='Friday' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sábado</Form.Label>
                    <Form.Control value={formik.values.Saturday} onChange={formik.handleChange} type='text' name='Saturday' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Domingo</Form.Label>
                    <Form.Control value={formik.values.Sunday} onChange={formik.handleChange} type='text' name='Sunday' />
                </Form.Group>
                <Button variant='success' type='submit'>Actualizar</Button>

            </Form>
        </div>
    )
}

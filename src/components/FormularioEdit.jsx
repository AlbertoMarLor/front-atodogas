import React from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre del restaurante es requerido'),
    img: Yup.string().url('La URL de la imagen no es válida').required('La URL de la imagen es requerida'),
    type: Yup.string().required('El tipo de restaurante es requerido'),
    menu: Yup.array().of(
        Yup.object().shape({
            menuName: Yup.string().required('El nombre del menú es requerido'),
            dishes: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required('El nombre del plato es requerido'),
                    price: Yup.number().required('El precio del plato es requerido').positive('El precio debe ser un número positivo'),
                })
            ),
        })
    ),
});

const RestaurantForm = ({ business }) => {
    const onSubmit = (values, { resetForm }) => {

        fetch(`${import.meta.env.VITE_BACKEND_URL}api/restaurants/${business._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Restaurante agregado con éxito:', data);
                resetForm();
            })
            .catch(error => console.error('Error al agregar restaurante:', error));

    };

    return (
        <Formik
            initialValues={business}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form>
                    <div>
                        <label htmlFor="nombre">Nombre del Restaurante</label>
                        <Field type="text" id="nombre" name="nombre" />
                        <ErrorMessage name="nombre" component="div" />
                    </div>

                    <div>
                        <label htmlFor="img">URL de la Imagen</label>
                        <Field type="text" id="img" name="img" />
                        <ErrorMessage name="img" component="div" />
                    </div>

                    <div>
                        <label htmlFor="type">Tipo de Restaurante</label>
                        <Field type="text" id="type" name="type" />
                        <ErrorMessage name="type" component="div" />
                    </div>

                    <FieldArray name="menu">
                        {({ push, remove }) => (
                            <div>
                                <h3>Menús</h3>
                                {values.menu.map((menu, index) => (
                                    <div key={index}>
                                        <label htmlFor={`menu.${index}.menuName`}>Nombre del Menú</label>
                                        <Field type="text" id={`menu.${index}.menuName`} name={`menu.${index}.menuName`} />
                                        <ErrorMessage name={`menu.${index}.menuName`} component="div" />

                                        <FieldArray name={`menu.${index}.dishes`}>
                                            {({ push: pushDish, remove: removeDish }) => (
                                                <div>
                                                    <h4>Platos</h4>
                                                    {menu.dishes.map((dish, dishIndex) => (
                                                        <div key={dishIndex}>
                                                            <label htmlFor={`menu.${index}.dishes.${dishIndex}.name`}>Nombre del Plato</label>
                                                            <Field type="text" id={`menu.${index}.dishes.${dishIndex}.name`} name={`menu.${index}.dishes.${dishIndex}.name`} />
                                                            <ErrorMessage name={`menu.${index}.dishes.${dishIndex}.name`} component="div" />

                                                            <label htmlFor={`menu.${index}.dishes.${dishIndex}.price`}>Precio del Plato</label>
                                                            <Field type="number" id={`menu.${index}.dishes.${dishIndex}.price`} name={`menu.${index}.dishes.${dishIndex}.price`} />
                                                            <ErrorMessage name={`menu.${index}.dishes.${dishIndex}.price`} component="div" />

                                                            <button type="button" onClick={() => removeDish(dishIndex)}>
                                                                Eliminar Plato
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button type="button" onClick={() => pushDish({ name: '', price: '' })}>
                                                        Agregar Plato
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>

                                        <button type="button" onClick={() => remove(index)}>
                                            Eliminar Menú
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => push({ menuName: '', dishes: [{ name: '', price: '' }] })}>
                                    Agregar Menú
                                </button>
                            </div>
                        )}
                    </FieldArray>

                    <div>
                        <button type="submit">Actualizar Restaurante</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default RestaurantForm;

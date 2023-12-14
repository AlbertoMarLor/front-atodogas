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
                    ingredients: Yup.string(),
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
                console.log('Restaurante actualizado con éxito:', data);
                resetForm();
            })
            .catch(error => console.error('Error al actualizar restaurante:', error));
    };

    return (
        <Formik
            initialValues={business}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form className='restaurantForm'>
                    <div>
                        <label className='restaurantForm label' htmlFor="nombre">Nombre del Restaurante</label>
                        <Field className='restaurantForm field' type="text" id="nombre" name="nombre" />
                        <ErrorMessage name="nombre" component="div" />
                    </div>

                    <div>
                        <label className='restaurantForm label' htmlFor="img">URL de la Imagen</label>
                        <Field className='restaurantForm field' type="text" id="img" name="img" />
                        <ErrorMessage name="img" component="div" />
                    </div>

                    <div>
                        <label className='restaurantForm label' htmlFor="type">Tipo de Restaurante</label>
                        <Field className='restaurantForm field' type="text" id="type" name="type" />
                        <ErrorMessage name="type" component="div" />
                    </div>

                    <FieldArray name="menu">
                        {({ push, remove }) => (
                            <div className='restaurantForm'>
                                <h3>Menús</h3>
                                {values.menu.map((menu, index) => (
                                    <div className='restaurantForm' key={index}>
                                        <label className='restaurantForm label' htmlFor={`menu.${index}.menuName`}>Nombre del Menú</label>
                                        <Field className='restaurantForm field' type="text" id={`menu.${index}.menuName`} name={`menu.${index}.menuName`} />
                                        <ErrorMessage name={`menu.${index}.menuName`} component="div" />

                                        <FieldArray name={`menu.${index}.dishes`}>
                                            {({ push: pushDish, remove: removeDish }) => (
                                                <div className='restaurantForm'>
                                                    <h4>Platos</h4>
                                                    {menu.dishes.map((dish, dishIndex) => (
                                                        <div className='restaurantForm' key={dishIndex}>
                                                            <label className='restaurantForm label' htmlFor={`menu.${index}.dishes.${dishIndex}.name`}>Nombre del Plato</label>
                                                            <Field className='restaurantForm field' type="text" id={`menu.${index}.dishes.${dishIndex}.name`} name={`menu.${index}.dishes.${dishIndex}.name`} />
                                                            <ErrorMessage name={`menu.${index}.dishes.${dishIndex}.name`} component="div" />

                                                            <label className='restaurantForm label' htmlFor={`menu.${index}.dishes.${dishIndex}.ingredients`}>Ingredientes del Plato</label>
                                                            <Field className='restaurantForm field' type="text" id={`menu.${index}.dishes.${dishIndex}.ingredients`} name={`menu.${index}.dishes.${dishIndex}.ingredients`} />
                                                            <ErrorMessage name={`menu.${index}.dishes.${dishIndex}.ingredients`} component="div" />

                                                            <label className='restaurantForm label' htmlFor={`menu.${index}.dishes.${dishIndex}.price`}>Precio del Plato</label>
                                                            <Field className='restaurantForm field' type="number" id={`menu.${index}.dishes.${dishIndex}.price`} name={`menu.${index}.dishes.${dishIndex}.price`} />
                                                            <ErrorMessage name={`menu.${index}.dishes.${dishIndex}.price`} component="div" />


                                                            <button className='restaurantForm button' style={{ backgroundColor: "tomato", color: "white" }} type="button" onClick={() => removeDish(dishIndex)}>
                                                                Eliminar Plato
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button className='restaurantForm button' style={{ backgroundColor: "lightgreen" }} type="button" onClick={() => pushDish({ name: '', price: '', ingredients: '' })}>
                                                        Agregar Plato
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>

                                        <button className='restaurantForm button' style={{ backgroundColor: "tomato", color: "white" }} type="button" onClick={() => remove(index)}>
                                            Eliminar Menú
                                        </button>
                                    </div>
                                ))}
                                <button className='restaurantForm button' style={{ backgroundColor: "lightgreen" }} type="button" onClick={() => push({ menuName: '', dishes: [{ name: '', price: '', ingredients: '' }] })}>
                                    Agregar Menú
                                </button>
                            </div>
                        )}
                    </FieldArray>

                    <div>
                        <button className='restaurantForm button' style={{ backgroundColor: "lightblue" }} type="submit">Actualizar Restaurante</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default RestaurantForm;

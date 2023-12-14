import React, { useEffect, useState } from 'react'
import { EditSchedule } from './EditSchedule';
import ModalForm from './ModalForm';

export const Schedule = ({ idNegocio, user }) => {

    const [schedule, setSchedule] = useState({});

    const getSchedule = async () => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/schedule/${idNegocio}`);
        const data = await response.json();

        if (data.status === "error") {
            const defaultSchedule = {
                restaurantId: `${idNegocio}`,
                schedule: {
                    Monday: "De 12:30 a 00:30",
                    Tuesday: "De 12:30 a 00:30",
                    Wednesday: "De 12:30 a 00:30",
                    Thursday: "De 12:30 a 00:30",
                    Friday: "De 12:30 a 00:30",
                    Saturday: "De 12:30 a 00:30",
                    Sunday: "De 12:30 a 00:30"
                }
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/schedule/`, {
                method: "POST",
                body: JSON.stringify(defaultSchedule),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const { data } = response.json();
            return setSchedule(data.schedule)
        }
        setSchedule(data.data)
    }

    useEffect(() => {
        getSchedule();
    }, [])

    return (
        <>
            {user.role === 'admin' &&
                <ModalForm
                    color={"success"}
                    title={"Editar horario"}
                    buttonText={"Editar horario restaurante"}
                    component={<EditSchedule idNegocio={idNegocio} schedule={schedule} />}
                />}
            <div className='schedule'>
                <h3>Horario Pedidos</h3>
                <div className="days">
                    <h4>Todos los dias, de <span>12:30</span> a <span>00:30</span></h4>
                </div>
                <h3>Horario Restaurante</h3>
                <div className="days">
                    <h4>Lunes</h4>
                    <p>{schedule?.Monday}</p>
                </div>
                <div className="days">
                    <h4>Martes</h4>
                    <p>{schedule?.Tuesday}</p>
                </div>
                <div className="days">
                    <h4>Miércoles</h4>
                    <p>{schedule?.Wednesday}</p>
                </div>
                <div className="days">
                    <h4>Jueves</h4>
                    <p>{schedule?.Thursday}</p>
                </div>
                <div className="days">
                    <h4>Viernes</h4>
                    <p>{schedule?.Friday}</p>
                </div>
                <div className="days">
                    <h4>Sábado</h4>
                    <p>{schedule?.Saturday}</p>
                </div>
                <div className="days">
                    <h4>Domingo</h4>
                    <p>{schedule?.Sunday}</p>
                </div>

            </div>
        </>
    )
}

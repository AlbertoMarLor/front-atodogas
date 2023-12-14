import React from 'react'
import { Form } from 'react-bootstrap'

export const Filter = ({ setFilter }) => {
    return (
        <div className="filter">

            <Form.Select onChange={(e) => setFilter(e.target.value)}>
                <option value="">Tipo de comida</option>
                <option value="">Todos</option>
                <option value="pizzeria">Pizzería</option>
                <option value="burger">Burger</option>
                <option value="polleria">Pollería</option>
                <option value="kebab">Kebab</option>
            </Form.Select>
        </div>
    )
}

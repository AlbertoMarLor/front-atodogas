import React from 'react'
import { Form } from 'react-bootstrap'

export const Filter = ({ setFilter }) => {
    return (
        <div className="filter">

            <Form.Select onChange={(e) => setFilter(e.target.value)}>
                <option value="">Tipo de comida</option>
                <option value="">Todos</option>
                <option value="mediterranea">Mediterránea</option>
                <option value="china">China</option>
                <option value="japonesa">Japonesa</option>
                <option value="italiana">Italiana</option>
            </Form.Select>
        </div>
    )
}

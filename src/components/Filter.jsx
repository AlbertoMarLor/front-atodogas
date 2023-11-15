import React from 'react'

export const Filter = ({ setFilter }) => {
    return (
        <div className="filter">
            <label htmlFor="">Tipo de comida</label>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">Todos</option>
                <option value="mediterranea">Mediterránea</option>
                <option value="china">China</option>
                <option value="japonesa">Japonesa</option>
                <option value="italiana">Italiana</option>
            </select>
        </div>
    )
}

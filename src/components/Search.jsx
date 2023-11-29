import React from 'react'
import { Form } from 'react-bootstrap';
import { FaMagnifyingGlass } from "react-icons/fa6";


export const Search = ({ search, setSearch, fetchData }) => {

    return (
        <div className='search'>
            <Form.Control
                type="text"
                placeholder="Nombre del restaurante"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FaMagnifyingGlass onClick={fetchData} className='glass' />
        </div>

    )
}

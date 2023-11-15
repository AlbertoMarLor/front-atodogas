import React from 'react'


export const Search = ({ search, setSearch, fetchData }) => {

    return (
        <div className='search'>
            <input
                type="text"
                placeholder="Nombre del restaurante"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={fetchData}>Buscar</button>
        </div>

    )
}

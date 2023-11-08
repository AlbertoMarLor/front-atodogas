import React from 'react'
import { BusinessList } from '../components/BusinessList'

export const Hero = () => {
    return (
        <>
            <div className='hero'>
                <button className='btn-hero'>Registra tu negocio</button>
            </div>
            <BusinessList />
        </>
    )
}

import React from 'react'
import { BusinessList } from '../components/BusinessList'
import { useNavigate } from 'react-router-dom';

export const Hero = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='hero'>
                <button className='btn-hero' onClick={() => navigate('/join')}>Registra tu negocio</button>
            </div>
            <BusinessList />
        </>
    )
}

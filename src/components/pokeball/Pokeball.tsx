import React from 'react';
import './Pokeball.css';

interface PokeballProps {
    size?: string; // Accept size as a prop
}

const Pokeball: React.FC<PokeballProps> = ({ size = '12rem' }) => {
    return (
        <div className="pokeball-wrapper" style={{ '--pokeball-size': size } as React.CSSProperties}>
            <div className="pokeball">
                <div className="pokeball-top"></div>
                <div className="pokeball-bottom"></div>
                <div className="pokeball-line"></div>
                <div className="pokeball-center">
                    <div className="pokeball-center-inner"></div>
                </div>
            </div>
            <div className="pokeball-shadow"></div>
        </div>
    );
}

export default Pokeball;
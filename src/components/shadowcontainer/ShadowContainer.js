import React from 'react';
import './Shadowcontainer.css';

function ShadowContainer({children, className}) {
    return (
        <article className={`shadow-cont ${className}`}>
            {children}
        </article>
    );
}

export default ShadowContainer;
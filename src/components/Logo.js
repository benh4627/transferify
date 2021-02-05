import React from 'react';
import './Logo.css';

import transferify from '../images/transf.png';

function Logo() {
    return(
        <div className="Logo">
            <img className="transferifyLogo" src={transferify} />
        </div>
    );
}

export default Logo;
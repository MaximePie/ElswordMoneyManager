import React from 'react';
import {Link} from "react-router-dom";

export default function Navbar(props) {

    return (
        <div className="Navbar">
            <Link to='/' className="Navbar__link">Tableau</Link>
            <Link to='/add' className="Navbar__link">Ajouter</Link>
        </div>
    );
}

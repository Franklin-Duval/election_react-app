import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'

import '../assets/css/navigation.css'

export default function Navigation(){
    return(
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                <img src={logo} alt="logo" style={image} />
                <p style={{marginTop: 10, marginLeft: 10, fontWeight: 'bold'}} >ASPY ELECTION</p>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navmenu" aria-controls="navmenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/" >Home</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/login" >Login</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/registration" >Registration</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/candidature" >Candidature</Link></li>

                    </ul>
                </div>
            </nav>
    )
}

const image = {
    height: 30,
    width: 30
}


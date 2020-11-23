import React from 'react'
import logo from '../logo.svg'
import user from '../assets/images/guest-128.png'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import '../assets/css/navigation.css'

export default class Navigation extends React.Component{

    state = {
        login: false
    }

    componentDidMount(){
        let str = Cookies.get('user')
        if (str !== undefined){
            this.setState({login: true})
        }
    }

    render(){
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                <Link to="/" className="row">
                    <img src={logo} alt="logo" style={styles.image} />
                    <p style={{marginTop: 2, marginLeft: 5, fontWeight: 'bold'}} >ASPY ELECTION</p>
                </Link>
                
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
                    {
                        this.state.login && (
                            <Link to="/account">
                                <div style={styles.link} className="profile" ><img src={user} alt="logo" style={styles.user} /></div>
                            </Link>
                        )
                    }
                    
                </div>
            </nav>
        )
    }
    
}

const styles = {

    image:{
        height: 30,
        width: 30
    },

    user:{
        height: 30,
        width: 30,
        padding: 5,
        backgroundColor: "black",
        borderRadius: 20,
        
    },

    link:{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 2
    }
    
}

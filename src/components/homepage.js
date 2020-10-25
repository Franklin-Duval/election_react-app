import React from 'react'
import { Link } from 'react-router-dom'

import '../assets/css/home.css'

function Home() {
    return(
        <div className="main">

            <div className="body" style={styles.container} >

                <div style={styles.container} className="container" >
                    <p style={styles.title} className="text-center" >Welcome to ASPY ELECTION 2020/2021</p>
                    <div className="row">
                        <div className="col-md-4" style={{marginTop: 50}}>
                            <p style={styles.text} >Sign up inorder to create an account and participate to the ASPY ELECTIONS of the academic year 2020/2021</p>
                            <Link type="button" className="btn btn-outline-light btn-lg" to="/registration">Sign Up</Link>
                        </div>

                        <div className="col-md-4" style={{marginTop: 50}}>
                            <p style={styles.text} >Login into your account inorder to participate and vote for your favourite candidates in the ASPY ELECTIONS</p>
                            <Link type="button" className="btn btn-outline-light btn-lg" to="/login" >Sign in</Link>
                        </div>

                        <div className="col-md-4" style={{marginTop: 50}}>
                            <p style={styles.text} >Become you too an exco member by applying for different posts in ASPY ELECTIONS</p>
                            <Link type="button" className="btn btn-outline-light btn-lg" to="/candidature" >Application</Link>
                        </div>
                    </div>
		        </div>
            </div>

            <div className="container-fluid footer row">
                <p style={{paddingTop: 10}} className="text-left col-md-4" >© 2020 All Rights Reserved</p>
                <p style={{paddingTop: 10}} className="text-left col-md-4" ></p>
                <p style={{paddingTop: 10}} className="text-right col-md-4" >Web Master</p>
            </div>

        </div>
    )
}

const styles = {
    title:{
        marginBottom: 50,
        fontSize: 40,
        fontFamily: "Times New Roman"
    },

    text:{
        fontSize: 18,
    },

    container:{
        paddingTop: 80,
        paddingBottom: 100
    }
}


export default Home
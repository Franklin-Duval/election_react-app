import React from 'react'

import '../assets/css/home.css'

function Home() {
    return(
        <div className="main">

            <div className="body" style={styles.container} >

                <div style={styles.container} className="container" >
                    <p style={styles.title} className="text-center" >Welcome to ASPY ELECTION 2020/2021</p>
                    <div className="row">
                        <div className="col-md-4">
                            <p style={styles.text} >Sign up inorder to create an account and participate to the ASPY ELECTIONS of the academic year 2020/2021</p>
                            <button type="button" className="btn btn-outline-light btn-lg">Sign Up</button>
                        </div>

                        <div className="col-md-4">
                            <p style={styles.text} >Login into your account inorder to participate and vote for your favourite candidates in the ASPY ELECTIONS</p>
                            <button type="button" className="btn btn-outline-light btn-lg">Sign in</button>
                        </div>

                        <div className="col-md-4">
                            <p style={styles.text} >Become you too an exco member by applying for different posts in ASPY ELECTIONS</p>
                            <button type="button" className="btn btn-outline-light btn-lg">Application</button>
                        </div>
                    </div>
		        </div>
            </div>

            <div className="container-fluid footer row">
                <p style={{paddingTop: 10}} className="text-left col-md-6" >© 2020 All Rights Reserved</p>
                <p style={{paddingTop: 10}} className="text-right col-md-6" >Web Master</p>
            </div>

        </div>
    )
}

const styles = {
    title:{
        paddingTop: 50,
        marginBottom: 50,
        fontSize: 40,
        fontFamily: "Times New Roman"
    },

    text:{
        fontSize: 18,
    },

    container:{
        paddingTop: 50,
        paddingBottom: 70
    }
}


export default Home
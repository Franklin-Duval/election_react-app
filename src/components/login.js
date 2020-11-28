import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

import '../assets/css/login.css'
import vote from '../assets/images/voting.jpg'
import API_URL from '../assets/constants'

export default class Login extends React.Component{

    state = {
        matricule: "",
        email: "",
        name: "",
        agree: false,

        finish: false,
        id: 0
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(API_URL + 'auth-login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                matricule: this.state.matricule,
                email: this.state.email,
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson["login"] === "SUCCESS"){
                this.setState({
                    finish: true,
                    name: responseJson["name"],
                    id: responseJson["id"]
                })
                
                let users = {}
                users.id = responseJson["id"]
                users.matricule = this.state.matricule
                users.name = responseJson["name"]
                users.email = this.state.email
                
                this.props.reduxSaveUser(users)
                
                Cookies.set('user', users, { expires: 1 })
            }
            else if (responseJson["login"] === "FAILED") {
                alert('The information provided is invalid: Verify the matricule and email entered')
            }
            

        })
        .catch((error) =>{
            
            console.log(error)
            alert('Errors')
        })
        
    }

    render(){
        if (this.state.finish){
            return (
                <Redirect 
                    to={{
                        pathname: "/candidates",
                        name: this.state.name,
                        id: this.state.id
                    }}
                />
            )
        }
        else
        {
            return(
                <div style={{paddingBottom: 25}} className="bodys" >
                    <h3 className="text-center" >Login Form</h3>
                    <form onSubmit={(event) => this.handleSubmit(event)} style={{backgroundColor: "white"}} >
                        <div>
                            <img src={vote} alt="" className="image"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="matricule">Matricule</label>
                            <input 
                                type="text" 
                                className="form-control" id="matricule"
                                value={this.state.matricule}
                                onChange={(event) => {
                                    this.setState({matricule: event.target.value})
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" aria-describedby="emailHelp"
                                value={this.state.email}
                                onChange={(event) => {
                                    this.setState({email: event.target.value})
                                }}
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        
                        <div className="form-group form-check">
                            <input 
                                type="checkbox" 
                                className="form-check-input" id="check" 
                                onChange={() => {
                                    this.setState({agree: !(this.state.agree)})
                                }}
                            />
                            <label className="form-check-label" htmlFor="check">I agree</label>
                        </div>
                        <div style={{marginBottom: 30, marginTop: 15}} >
                            <button type="submit" className="btn btn-primary col-md-12 text-center" disabled={this.state.agree ? false : true} >Submit</button>
                        </div>
                        <p style={{color: "black", fontSize: 14}} >No Account ? <Link to="/registration">Create an account</Link> </p>
                    </form>

                </div>
            )
        }
    }
}

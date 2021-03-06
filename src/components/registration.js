import React from 'react'
import { Redirect } from 'react-router-dom'

import '../assets/css/login.css'
import vote from '../assets/images/govote.jpg'
import API_URL from '../assets/constants'

export default class Registration extends React.Component{

    state = {
        matricule: "",
        name: "",
        surename: "",
        contact: "",
        email: "",
        level: "",
        department: "",
        agree: false,
        listDepartment: [],

        finish: false,
        id: 0,
    }

    componentDidMount(){
        this.fetchDepartment()
    }

    fetchDepartment = () => {
        fetch(API_URL + 'department/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({listDepartment: responseJson})
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(API_URL + 'voter/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                matricule: this.state.matricule,
                name: this.state.name,
                surename: this.state.surename,
                contact: this.state.contact,
                email: this.state.email,
                level: this.state.level,
                department: this.state.department,
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson["status"] === "SUCCESS"){
                alert("Registration Successful")
                this.setState({
                    finish: true,
                    id: responseJson["id"]
                })
            }
            else if (responseJson["status"] === "FAILURE") {
                alert("You are not registered as an Aspian. Contact the administrator")
            }
            else {
                alert(
                    responseJson["matricule"] ? "This matricule has already been used. Verify again!" : "" + 
                    responseJson["contact"] ? "\nThis contact has already been used. Verify again!" : "" + 
                    responseJson["email"] ? "\nThis email has already been used. Verify again!" : ""
                )
            }

        })
        .catch((error) =>{
            console.log(error)
        })
    }

    render(){

        if (this.state.finish){
            return (
                <Redirect 
                    to={{
                        pathname: "/candidates",
                        name: this.state.name + " " + this.state.surename,
                        id: this.state.id
                    }}
                />
            )
        }
        else
        {
            return(
                <div style={{paddingBottom: 25}} className="bodys" >
                    <h3 className="text-center" >Registration Form</h3>
                    <form onSubmit={(event) => this.handleSubmit(event)} style={{backgroundColor: "white"}} >
                        <div>
                            <img src={vote} alt="" className="image" />
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
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                className="form-control" id="name"
                                value={this.state.name}
                                onChange={(event) => {
                                    this.setState({name: event.target.value})
                                }}
                            />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="surename">Surename</label>
                            <input 
                                type="text" 
                                className="form-control" id="surename"
                                value={this.state.surename}
                                onChange={(event) => {
                                    this.setState({surename: event.target.value})
                                }}
                            />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="contact">Contact</label>
                            <input 
                                type="text" 
                                className="form-control" id="contact"
                                value={this.state.contact}
                                onChange={(event) => {
                                    this.setState({contact: event.target.value})
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
                        
                        <div className="form-group">
                        <label htmlFor="level">Level</label>
                            <select className="form-control" id="level" onChange={(event) => this.setState({level: event.target.value})}>
                                <option></option>
                                <option value={1}>Level 1</option>
                                <option value={2}>Level 2</option>
                                <option value={3}>Level 3</option>
                                <option value={4}>Level 4</option>
                                <option value={5}>Level 5</option>
                            </select>
                        </div>
    
                        
                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <select className="form-control" id="department" onChange={(event) => this.setState({department: event.target.value})}>
                                <option></option>
                                {
                                    this.state.listDepartment.map((item, index) => {
                                        return(
                                            <option 
                                                key={index}
                                                value={API_URL + "department/" + item.id + "/"}
                                            >
                                                {item.name}
                                            </option>
                                            
                                        )
                                    })
                                }
                            </select>
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
                    </form>
                </div>
            )
        }

        
    }
}
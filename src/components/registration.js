import React from 'react'
import { Redirect } from 'react-router-dom'

import '../assets/css/login.css'
import vote from '../assets/images/govote.jpg'

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
        fetch('http://192.168.43.214:8000/department/')
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
        fetch('http://192.168.43.214:8000/voter/', {
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
                <div>
                    <h3 className="text-center" >Registration Form</h3>
                    <form onSubmit={(event) => this.handleSubmit(event)} >
                        <div>
                            <img src={vote} alt="" style={{height: 150, width: 150, borderRadius: 150, marginLeft: "15%", marginBottom: 20}} />
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
    
                            <div className="dropdown" id="level">
                                <button style={{width: "100%"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style={{marginRight: "87%"}}>Level</span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#1" onClick={() => this.setState({level: 1})}>Level 1</a>
                                    <a className="dropdown-item" href="#2" onClick={() => this.setState({level: 2})}>Level 2</a>
                                    <a className="dropdown-item" href="#3" onClick={() => this.setState({level: 3})}>Level 3</a>
                                    <a className="dropdown-item" href="#4" onClick={() => this.setState({level: 4})}>Level 4</a>
                                    <a className="dropdown-item" href="#5" onClick={() => this.setState({level: 5})}>Level 5</a>
                                </div>
                            </div>
                        </div>
    
                        
                        <div className="form-group">
                            <label htmlFor="department">Department</label>
    
                            <div className="dropdown" id="department">
                                <button style={{width: "100%"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span style={{marginRight: "80%"}}>Department</span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {
                                        this.state.listDepartment.map((item, index) => {
                                            return(
                                                <a key={index} className="dropdown-item" href="#1" onClick={() => {
                                                    let str = "http://localhost:8000/department/" + item.id + "/"
                                                    this.setState({department: str})
                                                }}>
                                                    {item.name}
                                                </a>
                                            )
                                        })
                                    }
                                    
                                </div>
                            </div>
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
                        <button type="submit" className="btn btn-primary" disabled={this.state.agree ? false : true} >Submit</button>
                    </form>
                </div>
            )
        }

        
    }
}
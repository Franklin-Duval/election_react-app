import React from 'react'
import { Redirect } from 'react-router-dom'

import '../assets/css/login.css'
import vote from '../assets/images/vote.jpg'
import API_URL from '../assets/constants'

export default class Candidature extends React.Component{

    state = {
        matricule: "",
        name: "",
        surename: "",
        contact: "",
        email: "",
        level: "",
        department: "",
        post: "",
        image: null,
        speech: "",
        agree: false,
        listDepartment: [],
        listPost: [],

        finish: false,
    }

    componentDidMount(){
        this.fetchDepartment()
        this.fetchPost()
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

    fetchPost = () => {
        fetch(API_URL + 'post/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({listPost: responseJson})
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)

        /* let form_data = new FormData()
        form_data.append('image', this.state.image, this.state.image.name)
        form_data.append('matricule', this.state.matricule)
        form_data.append('name', this.state.name)
        form_data.append('surename', this.state.surename)
        form_data.append('contact', this.state.contact)
        form_data.append('email', this.state.email)
        form_data.append('level', this.state.level)
        form_data.append('department', this.state.department)
        form_data.append('post', this.state.post)
        form_data.append('speech', this.state.speech) */

        fetch(API_URL + 'candidate/', {
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
                post: this.state.post,
                speech: this.state.speech,
                image: this.state.image
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson["status"] === "SUCCESS"){
                alert("Registration Successful")
                this.setState({finish: true})
            }
            else if (responseJson["status"] === "FAILURE") {
                alert("You are not registered as an Aspian. Contact the administrator")
            }
            else {
                if (responseJson["matricule"]){
                    
                    alert("This matricule has already been used. Verify again!")
                }
                else if (responseJson["contact"]){
                    
                    alert("This contact has already been used. Verify again!")
                }
                else if (responseJson["email"]){
                    alert("This email has already been used. Verify again!")
                }
                
            }

        })
        .catch((error) =>{
            alert(error)
            console.log(error)
        })
    }

    render(){
        if (this.state.finish){
            return (
                <Redirect 
                    to={{
                        pathname: "/candidates",
                        name: this.state.name + " " + this.state.surename
                    }}
                />
            )
        }
        else
        {
            return(
                <div style={{paddingBottom: 25}} className="bodys" >
                    <h3 className="text-center" >Candidature Form</h3>
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

                        <div className="form-group">
                            <label htmlFor="post">Post</label>
                            <select className="form-control" id="post" onChange={(event) => this.setState({post: event.target.value})}>
                                <option></option>
                                {
                                    this.state.listPost.map((item, index) => {
                                        return(
                                            <option 
                                                key={index}
                                                value={API_URL + "post/" + item.id + "/"}
                                            >
                                                {item.name}
                                            </option>
                                            
                                        )
                                    })
                                }
                            </select>
                            
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="img">Select image : </label>
                            <input
                                type="file"
                                id="img" name="img"
                                accept="image/*"
                                onChange={(event) => {
                                    this.setState({image: event.target.value})
                                }}
                            />
                        </div> */}
                        
                        <div className="form-group">
                            <label htmlFor="speech">Speech</label>
                            
                            <textarea 
                                className="form-control" id="speech" aria-describedby="speechHelp"
                                value={this.state.speech}
                                rows="5"
                                onChange={(event) => {
                                    this.setState({speech: event.target.value})
                                }}
                            >
                            </textarea>
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
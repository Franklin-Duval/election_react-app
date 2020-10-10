import React from 'react'

import '../assets/css/login.css'

export default class Registration extends React.Component{

    state = {
        matricule: "",
        name: "",
        surename: "",
        contact: "",
        email: "",
        level: "",
        department: "",
        agree: false
    }

    handleSubmit = () => {
        if (this.state.agree){
            alert('Form submitted : ' + this.state.matricule + ' ' + this.state.email + ' ' + this.state.agree)
        }
    }

    render(){
        return(
            <div>
                <p style={{color: "black"}} >Registration Form</p>
                <form onSubmit={() => this.handleSubmit()} >
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
                        <label htmlFor="matricule">Level</label>
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
                        <label htmlFor="matricule">Department</label>
                        <input 
                            type="text" 
                            className="form-control" id="matricule"
                            value={this.state.matricule}
                            onChange={(event) => {
                                this.setState({matricule: event.target.value})
                            }}
                        />
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
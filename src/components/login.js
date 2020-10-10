import React from 'react'

import '../assets/css/login.css'

export default class Login extends React.Component{

    state = {
        matricule: "",
        email: "",
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
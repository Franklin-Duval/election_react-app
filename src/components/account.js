import React from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import API_URL from '../assets/constants'

export default class Account extends React.Component{

    state = {
        id: 0,
        matricule: "",
        name: "",
        surename: "",
        contact: "",
        email: "",
        level: "",
        department: "",
        post: "",
        image: "",
        speech: "",

        agree: false,
        type: undefined,
        listDepartment: [],
        listPost: [],

        connected: true,
    }

    componentDidMount(){
        let str = Cookies.get('user')
        let user = undefined
        if (str !== undefined){
            user = JSON.parse(str)
        }
        
        this.setState({id: user.id})
        this.fetchCandidate(user.id)
        this.fetchDepartment()
    }


    fetchCandidate = (id) => {
        let str = API_URL + 'candidate/' + id + '/'
        fetch(str)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.detail){
                this.fetchUser(id)
            }
            else{
                this.fetchPost()
                this.setState({
                    matricule: responseJson.matricule,
                    name: responseJson.name,
                    surename: responseJson.surename,
                    contact: responseJson.contact,
                    email: responseJson.email,
                    level: responseJson.level,
                    department: responseJson.department,
                    post: responseJson.post,
                    speech: responseJson.speech ? responseJson.speech : "",
                    type: "candidate"
                })
            }
            
        })
        .catch((error) =>{
            alert('Not candidate')
        })
    }

    fetchUser = (id) => {
        let str = API_URL + 'voter/' + id + '/'
        fetch(str)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                matricule: responseJson.matricule,
                name: responseJson.name,
                surename: responseJson.surename,
                contact: responseJson.contact,
                email: responseJson.email,
                level: responseJson.level,
                department: responseJson.department,
                type: "voter"
            })
        })
        .catch((error) =>{
            console.log(error)
        })
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

    updateUser = (event) => {
        event.preventDefault()
        let str = ""
        if (this.state.type === "candidate"){
            str = API_URL + "candidate/"
        }
        else{
            str = API_URL + "voter/"
        }

        fetch(str,  {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
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
        })
        
    }
    render(){
        if (this.state.finish){
            return (
                <Redirect 
                    to={{
                        pathname: "/login",
                        name: this.state.name + " " + this.state.surename
                    }}
                />
            )
        }
        else
        {
            return(
                <div style={{paddingBottom: 25}} >
                    <h3 className="text-center" >My Account</h3>
                    <form onSubmit={(event) => this.updateUser(event)} style={{backgroundColor: "white"}} >
                            
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
                            <select className="form-control" id="level" value={this.state.level} onChange={(event) => this.setState({level: event.target.value})} >
                                <option value={1}>Level 1</option>
                                <option value={2}>Level 2</option>
                                <option value={3}>Level 3</option>
                                <option value={4}>Level 4</option>
                                <option value={5}>Level 5</option>
                            </select>
                            
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <select className="form-control" id="department" value={this.state.department} onChange={(event) => this.setState({department: event.target.value})}>
                                {
                                    this.state.listDepartment.map((item, index) => {
                                        return(
                                            <option 
                                                key={index}
                                                value={"http://192.168.43.214:8000/department/" + item.id + "/"}
                                            >
                                                {item.name}
                                            </option>
                                            
                                        )
                                    })
                                }
                            </select>
                        </div>
    
                        {
                            this.state.type === "candidate" ?
                            (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="post">Post</label>
                                        <select className="form-control" id="post" value={this.state.post} onChange={(event) => this.setState({post: event.target.value})}>
                                            {
                                                this.state.listPost.map((item, index) => {
                                                    return(
                                                        <option 
                                                            key={index}
                                                            value={"http://192.168.43.214:8000/post/" + item.id + "/"}
                                                        >
                                                            {item.name}
                                                        </option>
                                                        
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
    
                                    <div className="form-group">
                                        <label htmlFor="speech">Speech</label>
                                        <textarea 
                                            className="form-control" id="speech"
                                            value={this.state.speech}
                                            rows="5"
                                            onChange={(event) => {
                                                this.setState({speech: event.target.value})
                                            }}
                                        >
                                        </textarea>
                                        
                                    </div>
                                </div>
                            )
                            :
                            <div>
    
                            </div>
                        }
    
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
                            <button type="submit" className="btn btn-primary col-md-12 text-center" disabled={this.state.agree ? false : true} >Update</button>
                        </div>
                    </form>
                </div>
            )
        }

        
    }
}
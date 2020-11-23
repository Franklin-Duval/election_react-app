import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import Image from '../assets/images/vote.jpg'
import API_URL from '../assets/constants'

export default class Candidates extends React.Component{

    state = {
        user: "",
        listCandidates: [],
        listPosts: [],
        departments: [],
        presentDepartment: "",

        finalList: []
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        fetch(API_URL + 'candidate/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({listCandidates: responseJson})

            fetch(API_URL + 'post/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({listPosts: responseJson})

                this.Classify()
            })
            .catch((error) =>{
                console.log(error)
            })

        })
        .catch((error) =>{
            console.log(error)
        })
        
        fetch(API_URL + 'department/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({departments: responseJson})
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    Classify = () => {

        this.state.listPosts.forEach((item) =>{
            let final = {
                post: item.name,
                candidates: []
            }
            this.state.listCandidates.forEach((item2) => {
                if (item2.post.slice(22).includes(item.id)){
                    final.candidates.push(item2)
                }
            })
            let list = this.state.finalList
            list.push(final)
            this.setState({finalList: list})
        })

        let str = Cookies.get('user')
        if (str !== undefined){
            let user = JSON.parse(str)
            this.setState({user: user})
        }

    }

    name = this.props.location.name
    id = this.props.location.id

    render(){
        return(
            <div className="container">
                <div className="row" style={{marginTop: 30}}>
                    <h3 className="text-center">Welcome {this.state.user.name || this.name} </h3>
                    <Link type="button" className="btn btn-primary" style={{marginLeft: "20%"}} 
                        to={{
                            pathname: "/voting",
                            id: this.id
                        }}
                    >
                        Start the Vote
                    </Link>
                </div>
                <h2 style={{color: "black", margin: 20, textDecoration:"underline" }} className="text-center">List of Candidates</h2>

                {
                    this.state.finalList.map((item, index) => {
                        return(
                            <div key={index}>
                                <h3 style={{color: "red"}}>{item.post}</h3>
                                <div className="row">
                                    {
                                        item.candidates.map((items, index) => {
                                            return(
                                                <div key={index} style={{margin: 20}}>
                                                    <Link 
                                                        to={{
                                                            pathname: "/detail",
                                                            state:{
                                                                name: items.name + " " + items.surename,
                                                                level: items.level,
                                                                department: items.department,
                                                                matricule: items.matricule,
                                                                contact: items.contact,
                                                                email: items.email,
                                                                speech: items.speech,
                                                                post: item.post,
                                                                image: items.image
                                                            }
                                                        }}
                                                    
                                                    >
                                                        <div className="card" style={{width: "18rem"}}>
                                                            <img src={items.image ? items.image : Image} className="card-img-top" alt="" style={{height: 220}} />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{items.name + " " + items.surename} </h5>
                                                                <h6 className="card-text" style={{color: "black"}}>Level: {items.level} </h6>
                                                                {
                                                                    this.state.departments.map((item2, index) => {
                                                                        if (items.department.slice(22).includes(item2.id)){
                                                                            return <h6 key={index} className="card-text" style={{color: "black"}}>{item2.name} </h6>
                                                                        }
                                                                        else{
                                                                            return <div key={index}></div>
                                                                        }
                                                                    })
                                                                }
                                                                
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            

                        )
                    })
                }
                
            </div>
        )
    }
}
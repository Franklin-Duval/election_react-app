import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import API_URL from '../assets/constants'

export default class Voting extends React.Component{

    state = {
        user: "",
        login: false,
        finish: false,
        listCandidates: [],
        listPosts: [],
        finalList: [],
        votes: []
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

        var list =  Array(this.state.listPosts.length).fill()
        this.setState({votes: list})

        let str = Cookies.get('user')
        if (str !== undefined){
            let user = JSON.parse(str)
            this.setState({user: user})
        }
        else{
            this.setState({login: true})
        }
    }

    id = this.props.location.id

    handleSubmit = () => {
        let max = 1
        if (this.id === undefined && this.state.user === ""){
            alert("Login to your account")
            this.setState({login: true})
        }
        else{
            let str = API_URL + "voter/" + this.state.user.id + "/"

            this.state.votes.forEach((item) => {
                console.log(str + " "+ item)
                fetch(API_URL + 'vote/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        voter: str,
                        candidate: item,
                    })

                })
                .then((response) => response.json())
                .then((responseJson) => {
                    max++
                    if (responseJson["status"] === "SUCCESS" && max===this.state.votes.length){
                        console.log("sucess ", item)
                        alert("Thanks for voting")
                        this.setState({finish: true})
                    }
                })
                .catch((error) =>{
                    console.log(error)
                })
            })
        }
        
    }

    render(){
        if (this.state.finish){
            return (
                <Redirect to="/"/>
            )
        }
        else if (this.state.login){
            return (
                <Redirect to="/login"/>
            )
        }
        else
        {
            return(
                <div className="container">
                    <div style={{marginTop: 30}}>
                        <h3 className="text-center">ASPY Elections</h3>
                        <p style={{color: "black"}} className="text-center" >Start Voting</p>
                    </div>

                    {
                        this.state.finalList.map((item, index) => {
                            return(
                                <div key={index} style={{marginTop: 20, marginBottom: 20}}>
                                    <h3>{item.post}</h3>
                                    
                                    <select
                                        className="form-control"
                                        onChange={(event) => {
                                            let temp = this.state.votes
                                            temp[index] = event.target.value
                                            this.setState({votes: temp})
                                        }}
                                    >
                                        <option></option>
                                        {
                                            item.candidates.map((items, indexx) => {
                                                return(
                                                    <option key={indexx} value={API_URL + "candidate/" + items.id + "/"}>
                                                        {items.name + " " + items.surename}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            )
                        })
                    }

                    <div style={{marginBottom: 30, marginTop: 30}}>
                        <button type="button" className="btn btn-primary col-md-12 text-center" onClick={() => this.handleSubmit()}>Submit</button>
                    </div>

                </div>
            )
        }
    }
}
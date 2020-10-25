import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

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
        console.log("id", this.id)
    }

    fetchData = () => {
        fetch('http://192.168.43.214:8000/candidate/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({listCandidates: responseJson})

            fetch('http://192.168.43.214:8000/post/')
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
        
        console.log(this.state)
    }

    id = this.props.location.id

    handleSubmit = () => {
        if (this.id === undefined && this.state.user === ""){
            alert("Login to your account")
            this.setState({login: true})
        }
        else{
            let str = "http://192.168.43.214:8000/voter/" + this.state.user.id + "/"

            this.state.votes.forEach((item) => {
                console.log(str + " "+ item)
                fetch('http://192.168.43.214:8000/vote/', {
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
                    
                    if (responseJson["status"] === "SUCCESS"){
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

                                    <div className="dropdown">
                                        <button style={{width: "100%"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span style={{marginRight: "80%"}}>{item.post} </span>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {
                                                item.candidates.map((items, indexx) => {
                                                    return(
                                                        <div key={indexx} style={{margin: 20}}>
                                                            <a className="dropdown-item" href="#1" onClick={() => {
                                                                let str = "http://localhost:8000/candidate/" + items.id + "/"
                                                                let temp = this.state.votes
                                                                temp[index] = str
                                                                this.setState({votes: temp})
                                                            }}>
                                                                {items.name + " " + items.surename}
                                                            </a>
                                                            
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Submit</button>

                </div>
            )
        }
    }
}
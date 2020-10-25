import React from 'react'

import Image from '../assets/images/vote.jpg'

export default class Result extends React.Component{

    state = {
        listCandidates: [],
        listPosts: [],
        finalList: [],
        votes: []
    }

    componentDidMount(){
        this.fetchData()
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
                max: 0,
                total: 0,
                candidates: []
            }
            this.state.listCandidates.forEach((item2) => {
                if (item2.post.slice(22).includes(item.id)){
                    final.candidates.push(item2)
                    final.total = final.total + item2.numberVotes
                    if (item2.numberVotes > final.max){
                        final.max = item2.numberVotes
                    }
                }
            })
            let list = this.state.finalList
            list.push(final)
            this.setState({finalList: list})
        })

        var list =  Array(this.state.listPosts.length).fill()
        this.setState({votes: list})
    }

    render(){
        return(
            <div className="container">
                <div style={{marginTop: 30}}>
                    <h3 className="text-center">ASPY Elections</h3>
                    <p style={{color: "black"}} className="text-center" >Results</p>
                </div>

                {
                    this.state.finalList.map((item, index) => {
                        return(
                            <div key={index}>
                                <h3>{item.post}</h3>
                                <div className="row">
                                    {
                                        item.candidates.map((items, index) => {
                                            
                                            return(
                                                <div key={index} style={{margin: 20}}>
                                                    <div className="card" style={{width: "18rem", backgroundColor: item.max <= items.numberVotes ? "red" : ""}}>
                                                        <img src={Image} className="card-img-top" alt="" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{items.name + " " + items.surename} </h5>
                                                            <h6 className="card-text">Level: {items.level} </h6>
                                                            <h6 className="card-text"> {((items.numberVotes / item.total) * 100).toFixed(2)}% </h6>
                                                            
                                                        </div>
                                                    </div>
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
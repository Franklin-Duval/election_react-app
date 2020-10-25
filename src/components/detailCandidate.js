import React from 'react'

import Image from '../assets/images/vote.jpg'

export default class Detail extends React.Component{

    state = {
        department: ""
    }

    componentDidMount(){
        this.fetchDepartment()
    }
    
    candidate = this.props.location.state

    fetchDepartment = () => {
        fetch(this.candidate.department)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({department: responseJson})
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    
    render(){
        return(
            <div className="container" style={{marginTop: 50, marginBottom: 50}}>
                <h2 className="text-center">Candidate Information</h2>

                <div className="row" style={{marginTop: 50}}>
                    <img src={Image} alt="" style={{height: 300, width: 300, marginLeft: 30}} />
                    <div style={{marginLeft: 30}}>
                        <h2 style={{marginTop: 20}}>{this.candidate.name} </h2>
                        <p style={styles.text}>Level: {this.candidate.level} </p>
                        <p style={styles.text}>{this.state.department.name} </p>    
                        <p style={styles.text}>Email: {this.candidate.email} </p>
                        <p style={styles.text}>Contact: {this.candidate.contact} </p>
                    </div>
                    

                </div>
                <h4 style={{marginTop: 20}}>Speech</h4>
                <p style={{color: "black"}}><b>``</b> {this.candidate.speech} <b>``</b></p>
            </div>
        )
    }
}


const styles = {
    text:{
        color: "black",
        fontSize: 20,
        fontStyle: "Times New Roman"
    }
}
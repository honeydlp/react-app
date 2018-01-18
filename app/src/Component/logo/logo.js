import React from 'react'
import imgSrc from './job.png'
import './logo.css'

class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img src={imgSrc} alt="logo"/>
            </div>
        )
    }
}

export default Logo
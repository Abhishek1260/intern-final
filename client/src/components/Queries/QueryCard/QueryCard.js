import React from 'react'
import './QueryCard.css'

const QueryCard = (props) => {
    return (
        <div className = "QueryCard">
            <div className="title">
                {props.title}
            </div>
            <div className="desc">
                {props.desc}
            </div>
            <div className="email_date">
                {props.email}
            </div>
        </div>
    )
}

export default QueryCard

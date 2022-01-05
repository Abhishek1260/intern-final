import React, { useEffect, useState } from 'react'
import './Query.css'
import QueryCard from './QueryCard/QueryCard'

const Query = () => {
    
    const [files, setfiles] = useState(null)

    useEffect(async () => {
        
        const response = await fetch('https://project5-intern.herokuapp.com/api/v2/getall' , {
            method : "GET" ,
            headers : {"contentType" : "application/json"} ,
        })
        const result = await response.json()
        setfiles(result.queries)

    }, [])

    return (
        <div className = "Query">
            {(!files)?<div>nothing to show</div>:files.map((event) => {
                return <QueryCard title = {event.title} desc = {event.description} email = {event.emailId} key = {event._id}/>
            })}
        </div>
    )
}

export default Query

import React , {useEffect} from 'react'
import './Navbar.css'
import user from './pngwing.com (1).png'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import cookie from 'universal-cookie'

const cookies = new cookie()

const Navbar = () => {

    const navigate = useNavigate()

    const logoff = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        cookies.remove('token' , {path : "/" , expires : Date.now()})
        cookies.remove('name' , {path : "/" , expires : Date.now()})
        window.location.href = "/login"
    }
    
    useEffect(() => {
        
        const token = localStorage.getItem('token')
        if (token) {

        }
        else {
            navigate('/login')
        }
    
    }, [])

    return (
        <div className = "Navbar">
            <div className="logo">
                <img src={user} alt="" />
                <div className="firstintro">
                    Welcome,
                </div>
                <div className="secondintro">
                    {localStorage.getItem('name')}
                </div>
            </div>
            <div className="usefulUL">
                <ul>
                    <li><Link to = "/">All requests</Link></li>
                    <li><Link to = "/userQuery">Your requests</Link></li>
                    <li><a href = "/queryForm">Submit Query</a></li>
                    <li><a onClick={logoff}>Sign Out</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar

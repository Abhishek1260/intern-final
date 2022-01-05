import React , { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate , Link} from 'react-router-dom'
import cookie from 'universal-cookie'

const cookies = new cookie()

const Login = () => {

    const [register, setregister] = useState({
        name : "" ,
        emailID : "" ,
        Password : ""
    })

    const navigate = useNavigate()

    const Login = () => {
        
        const divs = document.getElementById('loginForm')
        divs.style.display = 'flex'

        const diva = document.getElementById('signUpForm')
        diva.style.display = 'none'

        const button = document.getElementById('login')
        button.style.backgroundColor = 'white'

        const button1 = document.getElementById('signup')
        button1.style.backgroundColor = 'rgba(255 , 255 , 255 , 0)'

    }

    const SignUp = () => {

        const divs = document.getElementById('loginForm')
        divs.style.display = 'none'

        const diva = document.getElementById('signUpForm')
        diva.style.display = 'flex'

        const button = document.getElementById('signup')
        button.style.backgroundColor = 'white'

        const button1 = document.getElementById('login')
        button1.style.backgroundColor = 'rgba(255 , 255 , 255 , 0)'

    }

    useEffect(() => {
        
        Login()

    }, [])

    const Home = () => {
        localStorage.setItem('token' , null)
        navigate('/queryForm')
    }

    const [credentials, setCredentials] = useState({
        emailID: "",
        Password: "",
      });
    
      const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value});
      };

    const handlerLogin = async (e) => {
        
        e.preventDefault()

        if (credentials.emailID === "") {
            document.getElementById('problem4').style.color = "red"
            document.getElementById('problem4').style.visibility = "visible"
            document.getElementById('problem4').innerHTML = "Kindly enter the email ID"
            return;
        }
        if (credentials.Password === "") {
            document.getElementById('problem5').style.color = "red"
            document.getElementById('problem5').style.visibility = "visible"
            document.getElementById('problem5').innerHTML = "Kindly enter the Password"
            return;
        }

        const response = await fetch('http://localhost:8000/api/v1/login' , { 
            method : "POST" ,
            headers : { 
                "Content-Type": "application/json",
            } ,
            body : JSON.stringify({
                emailid : credentials.emailID , 
                password : credentials.Password
            })
        })

        const result = await response.json()

        if (result.success) {
            const response1 = await fetch(`http://localhost:8000/api/v1/getdet/${result.token}` , {
                method : "POST",
                headers : { 
                    "Content-Type": "application/json",
                }
            })
            const result1 = await response1.json()

            if (result1.success) {
    
                localStorage.setItem('name' , result1.users.name)
                localStorage.setItem("token", result.token);
    
                cookies.set('token' , result.token)
                cookies.set('name' , result1.users.name)
                navigate('/')
                return;

            }
            
        }

    }

    const changeHandler = (e) => {
        setregister({...register , [e.target.name] : e.target.value})
    }

    const handlerSignup = async (e) => {
        e.preventDefault()

        if (register.name === "") {
            document.getElementById('problem7').style.color = "red"
            document.getElementById('problem7').style.visibility = "visible"
            document.getElementById('problem7').innerHTML = "Kindly enter your name"
            return;
        }
        if (register.emailID === "") {
            document.getElementById('problem8').style.color = "red"
            document.getElementById('problem8').style.visibility = "visible"
            document.getElementById('problem8').innerHTML = "Kindly enter the email ID"
            return;
        }
        if (register.Password === "") {
            document.getElementById('problem9').style.color = "red"
            document.getElementById('problem9').style.visibility = "visible"
            document.getElementById('problem9').innerHTML = "Kindly enter the Password"
            return;
        }
        
        
        const response = await fetch('http://localhost:8000/api/v1/signup' , {
            method : "POST" ,
            headers : { "Content-Type": "application/json"} ,
            body : JSON.stringify({
                name : register.name ,
                emailid : register.emailID.toLowerCase() ,
                password : register.Password
            })
        })

        const result = await response.json()

        if (result.success) {
            localStorage.setItem('token' , result.token)
            localStorage.setItem('name' , register.name)
            cookies.set('token' , result.token)
            cookies.set('name' , register.name)
            navigate('/')
        }

    }

    return (
        <div className = "Login">
            <div className="complogo">
                LOGO.
            </div>
            <div className="changebuttons">
                <div id="login">
                    <button onClick = {Login}>Login</button>
                </div>
                <div id="signup">
                    <button onClick = {SignUp}>signUp</button>
                </div>
            </div>
            <div className="get">
                <form onSubmit = {handlerLogin} className = "form1 loginForm visible" id = "loginForm">
                    <input type="text" className = "emailID loginForm visible" onChange={onchange} value = {credentials.emailID} name = "emailID" placeholder = "Enter the email ID"/>
                    <div className="problem" id = "problem4">this is some  problem</div>
                    <input type="password" className = "Password loginForm visible" onChange={onchange} value = {credentials.Password} name = "Password" placeholder = "Enter the password"/>
                    <div className="problem"id = "problem5">this is some  problem</div>
                    <input type="password" className = "Password loginForm visible" onChange={onchange} id = "hidden"value = {credentials.Password} name = "Password" placeholder = "Enter the password"/>
                    <div className="problem"id = "problem6">this is some  problem</div>
                    <div className="bttnLogin1 loginForm visible">
                        <label htmlFor="submit1" className = "bttnlabel1 loginForm visible"><i className="fas fa-arrow-right"></i></label>
                    </div>
                    <input type="submit" id = "submit1" name = "submitLogin" className = "login visible"/>
                </form>
                <form onSubmit = {handlerSignup} className = "form2 signupForm" id = "signUpForm" >
                    <input type="text" className = "name signupForm" name = "name" placeholder = "Enter your name" onChange={changeHandler} value = {register.name}/>
                    <div className="problem"id = "problem7">this is some  problem</div>
                    <input type="text" className = "emailID signupForm" name = "emailID" placeholder = "Enter your email" onChange={changeHandler} value = {register.emailID}/>
                    <div className="problem"id = "problem8">this is some  problem</div>
                    <input type="password" className = "Password signupForm" name = "Password" placeholder = "Enter your password" onChange={changeHandler} value = {register.Password}/>
                    <div className="problem"id = "problem9">this is some  problem</div>
                    <div className="bttnLogin1 signupForm">
                        <label htmlFor="submit2" className = "bttnlabel1 signupForm"><i className="fas fa-arrow-right"></i></label>
                    </div>
                    <input type="submit" id = "submit2" name = "submitSignUp" className = "signupForm"/>
                </form>
            </div>
            <div className="submitQuery">
                <a onClick = {Home} className = "btn">Submit Query</a>
            </div>
        </div>
    )
}

export default Login

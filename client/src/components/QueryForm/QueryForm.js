import React , { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './QueryForm.css'

const QueryForm = (props) => {

    const Navigate = useNavigate()

    const [finalfile, setfinalfile] = useState({
        emailID : "" ,
        TiTle : "" ,
        desc : ""
    })

    useEffect(async () => {
        
        if (props.token !== null) {
            const response = await fetch(`http://localhost:8000/api/v1/getdet/${props.token}` , {
                method : "POST" ,
                header : { 'Content-Type': 'application/json'} 
            })

            const result = await response.json()
            if (result.success) {
                setfinalfile({emailID: result.emailID})
                document.getElementById('emailId').disabled = true
            }
        }

    }, [])
    
    const sendQuery = async (e) => {

        e.preventDefault()

        if (finalfile.emailID === "") {
            document.getElementById('problem1').style.color = "red"
            document.getElementById('problem1').style.visibility = "visible"
            document.getElementById('problem1').innerHTML = "kindly enter a email id"
            return
        }
        if (finalfile.TiTle === "") {
            document.getElementById('problem2').style.color = "red"
            document.getElementById('problem2').style.visibility = "visible"
            document.getElementById('problem2').innerHTML = "kindly enter a title"
            return
        }
        if (finalfile.desc === "") {
            document.getElementById('problem3').style.color = "red"
            document.getElementById('problem3').style.visibility = "visible"
            document.getElementById('problem3').innerHTML = "kindly enter a descriptionb"
            return
        }

        if (props.token === null) {

            const response = await fetch('http://localhost:8000/api/v2/post/undefined' , {
                method : "POST" , 
                headers : {"Content-Type" : "application/json"} ,
                body : JSON.stringify({ 
                    emailID : finalfile.emailID ,
                    title : finalfile.TiTle ,
                    description : finalfile.desc
                })
            })

            const result = await response.json()
            if (result.success) {
                Navigate('/login')
            }

        }
        else {

            const response = await fetch(`http://localhost:8000/api/v2/post/${props.token}` ,{
                method : "POST" ,
                headers : {"Content-Type" : "application/json"} ,
                body : JSON.stringify({
                    emailId : finalfile.emailID ,
                    title : finalfile.TiTle ,
                    description : finalfile.desc
                })
            })

            const result = await response.json()
            if (result.success) {
                Navigate('/')
            }
        }

    }

    const changeHandler = (e) => {
        setfinalfile({...finalfile , [e.target.name] : e.target.value})
    }

    return (
        <div className = "QueryForm">
            <div className="queryFormTitle">
                QueryForm
            </div>
            <div className="Form">
                <form id = "submitform" onSubmit={sendQuery}>
                    <input type="text" name = "emailID" className = "emailID" id = "emailId" placeholder = "kindly enter your email id" value = {finalfile.emailID} onChange = {changeHandler}/>
                    <div className="problem" id = "problem1">this is a problem</div>
                    <input type="text" name = "TiTle" className = "TiTle" id = "TiTle" placeholder = "kindly enter the title" value = {finalfile.TiTle} onChange = {changeHandler}/>
                    <div className="problem" id = "problem2">this is a problem</div>
                    <textarea type="text" name = "desc" className = "desc" id = "descri" placeholder = "kindly give the description of the problem" value = {finalfile.desc} onChange = {changeHandler}/>
                    <div className="problem" id = "problem3">this is a problem</div>
                    <div className="submit123">
                        <label htmlFor="submit146"><i className="fas fa-arrow-right"></i></label>
                    </div>
                    <input type="submit" value="" id = "submit146" />
                </form> 
            </div>
        </div>
    )
}

export default QueryForm

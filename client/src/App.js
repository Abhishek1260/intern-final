import './App.css';
import Navbar from './components/Navbar/Navbar';
import Query from './components/Queries/Query';
import Querycopy from './components/Queries/Querycopy';
import {
  BrowserRouter,
  Routes ,
  Route
} from 'react-router-dom'
import { useEffect } from 'react';
import Login from './components/Login/Login';
import QueryForm from './components/QueryForm/QueryForm';
import cookie from 'universal-cookie'

const cookies = new cookie()

function App() {
  
  const token = localStorage.getItem('token')

  const options = [];

  const token1 = cookies.get('token')
  const name1 = cookies.get('name')

  useEffect(() => {
    
    if (token1 === undefined) {
      if (window.location.href === "http://localhost:3000/") {
        window.location.href = '/login'
      }
    }

  }, [])

  return (
    <BrowserRouter>
      <div className="circle1">
      </div>
      <div className="circle2">
      </div>
      <div className="App">
        <Routes>
          <Route path = "/" element = {<><Navbar /><Query /></>} />
          <Route path = "/userQuery" element = {<><Navbar /><Querycopy token = {token1}/></>} />
          <Route path = '/login' element = {<><Login/></>} />
          {/* <Route path = '/QueryForm' element = {token1 === undefined?<QueryForm token = {null}/>:<><Navbar /><QueryForm token = {token?token:null}/></>} /> */}
          {token && <Route path = "/QueryForm" element = {<><Navbar /><QueryForm token = {token} /></>} />}
        </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;

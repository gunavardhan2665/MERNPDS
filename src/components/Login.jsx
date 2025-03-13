import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email,setUserName]=useState('')
    const [password,setPassword] = useState('')

    const nav = useNavigate();


const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  
    try {
      const res = await axios.post('http://localhost:8080/login', { email, password });
  
      if (res.status === 200) {
        console.log('Login Successful');
        localStorage.setItem('email', email);
        nav('/Home');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid email or password');
      } else {
        alert('An error occurred while trying to login');
      }
    }
  };
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" id="username" placeholder="Enter your username" required onChange={(e)=>{setUserName(e.target.value)}}/>
        <br/>
        <label>Password</label>
        <input type="password" id="password" placeholder="Enter your password" required onChange={(e)=>{setPassword(e.target.value)}}/>
        <br/>
        <button type='Submit'>Login</button>
        
        </form>
    </div>
  )
}

export default Login
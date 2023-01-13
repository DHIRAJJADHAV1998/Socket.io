import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'

let user;
const Join = () => {
    const[name,setname]=useState("");
    
    const setuser=()=>{
        user=document.getElementById('joinInput').value;
        document.getElementById('joinInput').value="";
    }
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <h1>CHAT</h1>
            <input onChange={(e)=>setname(e.target.value)} placeholder='enter your name' type="text" id="joinInput"/>
            <Link onClick={(e)=>!name?e.preventDefault():null} to="/chat"><button onClick={setuser} className='joinbtn'><span>Login In</span></button></Link>
            
        </div>
        <Link>SIGNUP</Link>
        <Link>ADD CONTACT</Link>

    </div>
  )
}

export default Join;
export{user};
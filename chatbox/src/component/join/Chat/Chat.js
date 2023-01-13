import React, { useEffect, useState } from 'react'
import { user } from '../Join'
import { io } from 'socket.io-client'
import "./chat.css"
import Message from '../message/message'
import ReactScrollToBottom from "react-scroll-to-bottom";
import Cross3 from "../Chat/Cross3.png"




let socket;
socket=io("http://localhost:5000/")
const Chat = () => {
    const[id,setid]=useState("");
    const[messages,setMessages]=useState([]);
    let room="";
    const joinRoom=()=>{
      room=document.getElementById("joinInpu").value;
      document.getElementById("joinInpu").value='';
      socket.emit('join-room',room,messag=>{
        alert(messag)
      });
    }

const send=()=>{
    let message=document.getElementById('chatInput').value;
    socket.emit('message',{message,id,room});
    document.getElementById('chatInput').value="";
    
}
    useEffect(()=>{
      socket=io("http://localhost:5000/")
     socket.emit('custom-event',{user})
        socket.on('connect',()=>{
            setid(socket.id);
          })
          
          socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
          })

          socket.on('userJoined',(data)=>{
            setMessages([...messages,data]);

            console.log(data.user,data.message);
          })

          socket.on('leave',(data)=>{
            setMessages([...messages,data]);

            console.log(data.user,data.message);
          })
return()=>{
    socket.off();
}
        },[])
        useEffect(()=>{
            socket.on("sendmessage",(data)=>{
                setMessages([...messages,data]);

                console.log(data.message,data.id,'done');
            })
            return()=>{
                socket.off();           
            }
        },[messages])
        
  return (
    <div>
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='chatHeader'>
                <h2>C Chat</h2>
                   <a href='/'><img src={Cross3}/></a>   
                            
                 </div>
                <ReactScrollToBottom className='chatBox'>{messages.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message}classes={item.id===id?'right':'left'}/>)}   </ReactScrollToBottom>
                    <div className='inputBox'>    
                        <input  type="text" id="chatInput" onKeyPress={(e)=>e.key==='Enter'?send():null}/>
                         <button onClick={send} className='sendBtn'>send</button>
                    </div>     
        </div>
        
        <div className='joinBox'>    
                    <input id="joinInpu" type='text' placeholder='Enter Join Room Id'></input>
                    <button className='joinBt' onClick={joinRoom}>Join</button>

                    </div>    
    </div>
    </div>
  
  )
}

export default Chat
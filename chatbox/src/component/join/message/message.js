import React from 'react'
import "./Message.css"
import Like from "../message/Like.png"


const Message = ({user,message,classes}) => {
    const work=()=>{
    }
    if(user){
        return(
            <div className='flex'>
                            <div className={ `messageBox ${classes}`}>{`${user}: ${message}`}</div>
                            <img className='imags' src={Like} onClick={work}></img>
            </div>
        )
    }else{
        return(
            <div className='flex1'>
                  <img className='images' src={Like}/>
                    <div className={ `messageBox ${classes}`}>{`You: ${message}`}</div>
            </div>
        )
    }

}

export default Message
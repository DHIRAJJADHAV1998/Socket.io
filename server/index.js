const express=require('express');
const http=require('http');
const cors=require('cors');
const app=express();

const port=4000||process.env.PORT;
app.use(cors());

app.get("/",(req,res)=>{
    res.send("it is working on server "+port)
})

const server=http.createServer(app);
const io=require('socket.io')(5000,{
    cors:{
        origin:["http://localhost:3000"]
    },
});

const users=[{}];

io.on("connection",socket=>{
    socket.on('custom-event',({user})=>{
        users[socket.id]=user;
        console.log(user);
        console.log(`${user} has joined`)
        socket.broadcast.emit('userJoined',{user:'Admin',message:`${users[socket.id]} has joined}`})
        socket.emit('welcome',{user:'Admin',message:`welcome to the chat,${users[socket.id]}`})
    })


    socket.on('message',({message,id,room})=>{
      console.log(room,id,message)
        if(room===""){

            socket.broadcast.emit('sendmessage',{user:users[id],message,id})
        }else{
            socket.to(room).emit('sendmessage',{user:users[id],message,id})
        }        
    })

    socket.on('join-room',(room,callback)=>{
        socket.join(room)
        callback(`joined room ${room}`)
        
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} user has left`})
        console.log('user left')
    })    

})

app.listen(port,(err,res)=>{
    if(err){
        console.log(err)

    }else{
        console.log('server running on '+port)
    }
})
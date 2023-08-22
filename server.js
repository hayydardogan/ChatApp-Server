const express = require('express')
const socket = require('socket.io')
const cors = require('cors');


const app = express()
const server = app.listen(8080)
app.options("*", cors());
app.use(cors());

app.use(express.static('public'))

let temp = "";

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
    },
});

io.on('connection', (socket) => {
    // console.log(socket.id);

    socket.emit("welcome_message", "SocialMediaApp-Chat uygulamasına hoşgeldiniz...");

    socket.on("send_message", async (data) => {
        temp = '<p><strong>' + data.sender + ' : </strong>' + data.message + '</p>';
        await io.sockets.emit('chat', temp)
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
})
app.use(express.json());
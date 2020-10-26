const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const socketServer = require("socket.io")(httpServer);
app.use(express.static("activity"));
socketServer.on("connection",function (socket) {
    console.log("New Client Connected");
    console.log(socket.id);
    // listener => receiver file
    socket.on("colorChange",function (color){
            console.log(color);
            socket.broadcast.emit("rcolorChange",color);
    })
    // mouse down listener
    socket.on("md", function (point) {
        console.log(point);
        socket.broadcast.emit("onmd",point);
    })
    // mouse move listener
    socket.on("mm", function (point) {
        console.log(point);
        socket.broadcast.emit("onmm",point);
    })
})
// app.get("/home",function(req,res){
//     res.end("my home page");
// })

// tcp => uniquely identify server on a machine
let port = process.env.PORT || 3000;
httpServer.listen(port, function(){
    console.log("Server is listening to request at port 3000");
})
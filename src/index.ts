import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

let userCount = 0;
let allSockets:WebSocket[] = [];

wss.on("connection", (socket) => {

    allSockets.push(socket);

    console.log("User Connected");
    userCount++;
    console.log("User COnnected #" + userCount);

    socket.on("message", (message) => {
        console.log("Message Received", message.toString());
        for(let i = 0; i < allSockets.length; i++){
            const s = allSockets[i];
        s.send(message.toString()+": sent from the server");
        }
    });

})
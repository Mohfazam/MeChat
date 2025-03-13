"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
wss.on("connection", (socket) => {
    console.log("User Connected");
    userCount++;
    console.log("User COnnected #" + userCount);
    socket.on("message", (message) => {
        console.log("Message Received", message.toString());
    });
});

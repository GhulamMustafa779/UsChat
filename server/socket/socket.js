// import express from "express";
// import http from "http";
// import { Server } from "socket.io";

// const port = process.env.PORT || 5000;
// const app = express();
// const server = http.createServer(app);


// const io = new Server(server, {
//   cors: {
//     origin: 'https://192.168.228.220:5173',
//     methods: ["GET", "POST"],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('user connected : ',socket.id);
//   socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   socket.on('disconnect',()=>{
//       console.log('User disconnected');
//   })
// });

// app.listen(port);

// export { app, io, server };

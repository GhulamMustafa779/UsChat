//const express = require('express'); // without type module
//const cors = require('cors');
import express from "express"; // with type module in package.json
import cors from "cors";
import https from "https";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import conversationRoute from './routes/conversationRoute.js'
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { __DIRNAME } from "./utils/constants.js";
import setupSocketIO from "./socket/socket.js";


dotenv.config({});
const port = process.env.PORT || 5000;

const app = express();

// Load SSL certificates
console.log("DIR: ", __DIRNAME);
const privateKey = fs.readFileSync(path.join(__DIRNAME, "key.pem"), "utf8");
const certificate = fs.readFileSync(path.join(__DIRNAME, "cert.pem"), "utf8");

const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

//const server = createServer(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Use morgan middleware to log all requests
//app.use(morgan("combined"));

const corsOption = {
  //origin: "https://192.168.10.4:5173",
  origin: "https://192.168.18.26:5173",
  // origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOption));

export const io  = setupSocketIO(httpsServer);

// All routes using middleware of express
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);

httpsServer.listen(port, () => {
  connectDB();
  console.log(`listening on port ${port}!`);
});

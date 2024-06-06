import express from "express";

import sturoutes from "./routes/stu.routes.js"
import comroutes from "./routes/com.routes.js"
import maintanceroutes from "./routes/maintance.routes.js"
// import clgroutes from "./routes/clg.routes.js"
// import {connectdb} from "./db/connectDb.js"
import cookieParser from "cookie-parser"


const app=express()


app.use(express.json());


// app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/student",sturoutes)
// app.use("/clg",clgroutes)
app.use("/com",comroutes)
app.use("/admin",maintanceroutes)

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(3000,()=>{
    console.log("Server Runiing on Port 3000")
    // connectdb()
})
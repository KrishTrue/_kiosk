import express from 'express';
import connectDb from './config/DB.js';


const app=express()
connectDb()


app.get('/',(req,res)=>{
    res.send("Hello World")
})



export default app
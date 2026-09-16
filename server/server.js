import express from "express"
import cors from "cors"
import InvestmentModel from "./investment.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserModel from "./user.js"
import jwt from "jsonwebtoken"
import verify from "./verify.js"


const app=express()
dotenv.config()
mongoose.connect(process.env.MONGO_URI)



app.use(express.json())
app.use(cors())



app.post("/home",verify,function(req,res){
InvestmentModel.create({userId:req.userId,...req.body})
.then(function(data){
    res.json(data)
})
})

app.get("/home",verify,function(req,res){
InvestmentModel.find({userId:req.userId})
.then(function(data){
    res.json(data)
})
})

app.delete("/home/:id",verify,function(req,res){
InvestmentModel.findOneAndDelete({_id:req.params.id,userId:req.userId})
.then(function(data){
    res.json(data)
})
})


app.put("/home/:id",verify,function(req,res){
InvestmentModel.findOneAndUpdate(
    {userId:req.userId,
   _id:req.params.id},
   req.body,{new:true})
.then(function(data){
    res.json(data)
})
})


app.post("/register",function(req,res){
UserModel.create(req.body)
.then(function(data){
    res.json(data)
})
})

app.post("/login",function(req,res){
UserModel.findOne(req.body)
.then(function(data){
const token=jwt.sign({userId:data._id},"secret")
 res.json({token:token})
})
})





app.listen(5000);
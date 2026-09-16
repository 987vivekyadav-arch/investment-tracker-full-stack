import mongoose from "mongoose";

const userSchema=
mongoose.Schema({

name:"String",
email:"String",
password:"Number",

})

const UserModel=mongoose.model("user",userSchema)
export default UserModel;

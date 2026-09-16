import mongoose from "mongoose";

const mongooseSchema=
mongoose.Schema({

 userId:"String",  
user:"String",
investedAmount:"Number",
currentValue:"Number",
profit:"Number",
month:"String",
year:"Number",

})

const InvestmentModel=mongoose.model("investment",mongooseSchema)
export default InvestmentModel;

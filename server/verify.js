import jwt from "jsonwebtoken"

function verify(req,res,next){
console.log(req.headers)


const token=req.headers.authorization.split(" ")[1]
const decoded=jwt.verify(token,"secret")
req.userId=decoded.userId


next()


}
export default verify

import Jwt from "jsonwebtoken";
import { data } from "./config";
export const userMiddleware=(req,res,next)=>{
    try{
        const token=req.header("x-auth-token");
        if(!token) res.send("Invalid Tokens");
        const decoded=Jwt.verify(token,data.JwtPassword);
        req.userId=decoded;

    }
    catch(e){
        res.status(400).send("Invalid token");
    }
}
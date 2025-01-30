import Jwt, { JwtPayload } from "jsonwebtoken";
import { data } from "./config";
import { Request,Response ,NextFunction } from "express";
interface AuthRequest extends Request {
    userId?:string | JwtPayload
}
export const userMiddleware=(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const token=req.headers["x-auth-token"] as string || req.get("x-auth-token") as string;
        if(!token) res.status(401).send("Invalid Tokens");
        const decoded=Jwt.verify(token,data.JwtPassword as string ) as JwtPayload
        console.log(decoded);
        req.userId =decoded.id
        next();

    }
    catch(e){
        res.status(400).send("Invalid token");
    }
}
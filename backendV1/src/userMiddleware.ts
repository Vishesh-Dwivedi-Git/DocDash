import Jwt, { JwtPayload } from "jsonwebtoken";
import { data } from "./config";
import { Request,Response ,NextFunction } from "express";
interface AuthRequest extends Request {
    userId?:string | JwtPayload
}
export const  userMiddleware=async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{
    try{
        console.log("in the middleware");
        const token=req.headers["x-auth-token"] as string || req.get("x-auth-token") as string;
        if(!token) {
            res.status(401).send("Invalid Tokens");
            return;
        }
        console.log(token);
        const decoded=Jwt.verify(token,data.JwtPassword as string ) as JwtPayload
        console.log(decoded);
        req.userId =decoded.id
        console.log("Yaha to sab changa si !",req.userId);
        next();

    }
    catch(e){
         res.status(400).send("Invalid token");
         return;
    }
}
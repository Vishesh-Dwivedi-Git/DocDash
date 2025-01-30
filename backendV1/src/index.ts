import express, { Request,Response } from "express";
import { Content, Link, User } from "./db";
import bcrypt from "bcrypt"
import Jwt, { JwtPayload } from "jsonwebtoken";
import { data } from "./config";
import { userMiddleware } from "./userMiddleware";
import { random } from "./utils";
import mongoose from "mongoose";
import cors from "cors"

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(data.MongoURL as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


app.post("/api/v1/signup", async (req:Request,res:Response)=>{
    const {username,password}=req.body;
    try {
        const hashedPassword=await bcrypt.hash(password,10);
       await User.create({
        username:username,
        password:hashedPassword
       })
       res.status(201).send({
        message:"User Sign Up SuccessFully"
       })
    }
    catch(e){
        res.status(411).send({
            message:"There was an error"
        })
    }
});

app.post("/api/v1/signIn",async (req:Request,res:Response ):Promise<any> =>{
    const {username ,password} =req.body;
    console.log("Signin");
    try{
        const user=await User.findOne({
            username:username,
        });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });
        const hashPas=await bcrypt.compare(password,user.password as string);
        if(!hashPas) return res.status(400).json({message:"Invalid email or password"});
        const token=Jwt.sign({
            id:user._id
        },data.JwtPassword as string);

        res.json({
            message:"User logined",
            token,
        })
    }
    catch(e){
        res.status(401).send({
            message:"Error Occured!"
        })
    }
   

})

interface AuthRequest extends Request{
    userId?:string | JwtPayload
}

app.post("/api/v1/content",userMiddleware, async (req:AuthRequest,res:Response):Promise<any>=>{
    const {link , type , title}=req.body;
    console.log("hi");
    try{
        //create and store the link
        const user= await Content.create({
            link:link,
            type:type,
            title:title,
            tags:[],
            userId:req.userId
        });
        console.log(user)
        if(!user){
            res.status(401).send({
                message :"User doesnt exist"
            })
        }
        res.status(200).json({
            message:"Content Created !!"
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send({
            message:"An Error Occurred !"
        })
    }
})


app.get("/api/v1/content",userMiddleware,async (req:AuthRequest,res:Response):Promise<any>=>{
    const userId=req.userId;
    const content=await Content.find({
        userId:userId
    })
    res.json({
        content
    })
});

app.delete("/api/v1/content",userMiddleware,async (req:AuthRequest,res:Response):Promise<any>=>{
    try {
        
        await Content.deleteMany({
        userId:req.userId
    });
    res.json({
        message:"Deleted"
    })
    }
    catch(e){
        res.send({e});
    }
   

})

app.post("/api/v1/share",userMiddleware,async (req:AuthRequest,res:Response):Promise<any>=>{
    const share=req.body.share;
    if(share){
        const existingLink=await Link.findOne({
            userId:req.userId
        });
    
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return;
        }
        const hash=random(10);
        await Link.create({
            userId:req.userId,
            hash:hash
        })
        res.json({
            hash
        });
    }
    else{
        await Link.deleteOne({
            userId:req.userId
        })
        res.json({
            message:"Removed Link"
        })
    }
})

app.get("/api/v1/:shareLink",async (req:Request,res:Response):Promise<any>=>{
    const hash=req.params.shareLink;
    console.log(hash);
    const link=await Link.findOne({
        hash:hash
    })
    if(!link){
        res.status(411).json({
             message:"sorry incorrect input"
        })  
        return ;
    }
    
    const content=await Content.find({
        userId:link.userId
    })

    const user=await User.findOne({
        _id:link.userId
    }); 
    console.log(link);
    if(!user){
        res.status(411).json({
            message:"user not found , error should ideally not happen"
        })
    }

    res.json({
        username:user?.username,
        content:content
    })
})

app.listen(3000,()=>{
    console.log('server running on port 3000 !');
})

import express, { request } from "express";
import { Content, Link, User } from "./db";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import { data } from "./config";
import { userMiddleware } from "./userMiddleware";


const app=express();
app.use(express.json());


app.("/signup", (req:,res:)=>{
    const {username,password}=req.body;
    try {
        const hashedPassword=bcrypt.hash(password,10);
       const user=User.create({
        username:username,
        password:hashedPassword
       })
       res.status(201).send({
        message:"User Sign Up SuccessFully"
       })
    }
    catch(e){
        res.status(401).send({
            message:"There was an error"
        })
    }
});

app.post("./signIn",async (req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({
            username:username
        });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });
        const hashPas=bcrypt.compare(password,user.password);
        if(!hashPas) return res.status(400).json({message:"Invalid email or password"});
        const token=Jwt.sign({
            id:user._id
        },data.JwtPassword);
        res.json({
            message:"User logined"
        })
    }
    catch(e){
        res.status(401).send({
            message:"Error Occured!"
        })
    }
   

})


app.post("/content",userMiddleware, async (req,res)=>{
    const {link , type , title}=req.body;
    try{
        //create and store the link
        const user= await Content.create({
            link:link,
            type:type,
            title:title,
            tag:Tag[],
            userId:req.userId
        });
        if(!user){
            res.status(401).send({
                message :"User doesnt exist"
            })
        }

    }
    catch(e){
        res.status(401).send({
            message:"An Error Occurred !"
        })
    }
})


app.get("/content",userMiddleware,async (req,res)=>{
    const userId=req.userId;
    const content=await Content.find({
        userId:userId
    })
    res.json({
        content
    })
});

app.delete("/content",userMiddleware,async (req,res)=>{
    await User.deleteMany({
        userId:req.userId
    });

    res.json({
        message:"Deleted"
    })

})

app.post("/share",userMiddleware,async (req,res)=>{
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

app.get("/:shareLink",async (req,res)=>{
    const hash=req.params.shareLink;
    const link=await Link.findOne({
        hash
    })
    if(!link){
        res.status(411).json{
            MessageChannel;"sorry incorrect input"
        }
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
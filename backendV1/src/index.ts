import express, { Request, Response } from "express";
import { Content, Link, User,Upload } from "./db";
import bcrypt from "bcrypt"
import Jwt, { JwtPayload } from "jsonwebtoken";
import { data } from "./config";
import { userMiddleware } from "./userMiddleware";
import { random } from "./utils";
import mongoose from "mongoose";
import cors from "cors"
import multer from "multer"
import bodyParser from "body-parser"
import { HfInference } from "@huggingface/inference";

import { uploadToCloudinary } from "./cloudinary";                  // Cloudinary upload function
import { generateAIResponse } from "./RAG/generateResp";
import  searchDatabase  from "./RAG/searchDatabase";
const hfApiKey =data.api_huggingFace;
const embeddingModel = "sentence-transformers/all-MiniLM-L6-v2"; // Choose appropriate model
const hf = new HfInference(hfApiKey);





// Storing files in memory temporarily
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage }).single("file");
  

const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

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
        const textForEmbedding = `${title} ${link} ${type}`;
        const response = await hf.featureExtraction({
            model: embeddingModel,
            inputs: textForEmbedding,
          });
        const user= await Content.create({
            link:link,
            type:type,
            title:title,
            tags:[],
            embedding: response,
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
    console.log("Entered Share ...");
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

app.post("/api/v1/upload", userMiddleware, upload, async (req: AuthRequest, res: Response):Promise<any> => {
    try {
      console.log("Upload API called");
  
      const { title, description, fileType } = req.body;
      console.log(title);
      const file = req.file?.path;
      console.log(file);
      const userId = req.userId;
  
      if (!file || !userId) {
        return res.status(400).json({ message: "File and User ID are required" });
      }
  
      // Upload file to Cloudinary
      const fileUrl = await uploadToCloudinary(file,fileType);
  
      // Save to Database
      const textForEmbedding = `${title} ${fileType} ${description} ${fileUrl}`;
      const response = await hf.featureExtraction({
        model: embeddingModel,
        inputs: textForEmbedding,
      });
      const newUpload = new Upload({ title, description, file: fileUrl, fileType, userId,embedding: response });
      await newUpload.save();
  
      res.status(201).json({ message: "Upload successful", data: newUpload });
    } catch (err) {
      console.error("Error in Upload API:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
});
app.get("/api/v1/upload", userMiddleware, async (req: AuthRequest, res: Response): Promise<any> => {
    const userId = req.userId;
    try {
        console.log("Fetching uploads for user:", userId);
        const uploads = await Upload.find({ userId });

        if (!uploads || uploads.length === 0) {
            return res.status(404).json({ message: "No uploads found" });
        }

        res.json({ uploads });
    } catch (e) {
        console.error("Error fetching uploads:", e);
        res.status(500).json({ message: "Server error", error: e });
    }
});
app.post("/search", async (req: Request, res: Response):Promise<any> => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });
  
    console.log(`Received search request: "${query}"`);
    const searchResults = await searchDatabase(query);
    let Response = "No relevant answer found.";
    if(searchResults){
              Response = await generateAIResponse(searchResults, query);
    }
  
    res.json({ results: searchResults, Response });
  });
// app.post("/query", async (req: Request, res: Response):Promise<any> => {
//     const { query } = req.body;
//     if (!query) return res.status(400).json({ error: "Query is required" });
  
//     try {
//       const response = await generateRAGResponse(query);
//       res.json({ response });
//     } catch (error) {
//       console.error("RAG Query Error:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
// });

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



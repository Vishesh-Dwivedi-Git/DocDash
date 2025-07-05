
import express, { Request, Response } from "express";
import { Content, Link, User, Upload } from "./db";
import bcrypt from "bcrypt";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { data } from "./config";
import { userMiddleware } from "./userMiddleware";
import { random } from "./utils";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import { uploadToCloudinary } from "./cloudinary";
// import { generateAIResponse } from "./RAG/generateResp";
// import  searchDatabase  from "./RAG/searchDatabase";
// const hfApiKey =data.api_huggingFace;
// const embeddingModel = "sentence-transformers/all-MiniLM-L6-v2"; // Choose appropriate model
// const hf = new HfInference(hfApiKey);

// import passport from "passport";
// import { Strategy as GitHubStrategy } from "passport-github2";
// import { Strategy as DiscordStrategy } from "passport-discord";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(data.google_client_id);
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(data.MongoURL as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const generateToken = (user: { _id: string }): string => {
  return Jwt.sign({ id: user._id }, data.JwtPassword as string, { expiresIn: "7d" });
};

const storage = multer.diskStorage({
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage }).single("file");

// 🔹 Email/Password Signup
app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User Sign Up SuccessFully" });
  } catch {
    res.status(411).json({ message: "There was an error" });
  }
});

// 🔹 Email/Password Login
app.post("/api/v1/signIn", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password as string))) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    const token = generateToken({ _id: user._id.toString() });
    res.json({ message: "User logined", token });
  } catch {
    res.status(401).json({ message: "Error Occurred!" });
  }
});

// ✅ 🔹 Google One Tap / Popup Login Handler
app.post("/api/v1/oauth/google", (req, res) => {
  const { token } = req.body;
  (async () => {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: data.google_client_id,
      });
      const payload = ticket.getPayload();
      const email = payload?.email;

      if (!email) return res.status(400).json({ error: "Email not found in token" });

      const user = await User.findOneAndUpdate(
        { username: email },
        { $set: { username: email } },
        { upsert: true, new: true }
      );
      const jwt = generateToken({ _id: user._id.toString() });
      res.json({ token: jwt });
    } catch (err) {
      res.status(401).json({ error: "Invalid Google token" });
    }
  })();
});

// 🔹 GitHub OAuth
// passport.use(new GitHubStrategy({
//   clientID: data.github_client_id,
//   clientSecret: data.github_client_secret,
//   callbackURL: "/api/v1/oauth/github/callback",
//   scope: ["user:email"],
// }, async (_accessToken, _refreshToken, profile, done) => {
//   try {
//     const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
//     const user = await User.findOneAndUpdate(
//       { username: email },
//       { $set: { username: email } },
//       { upsert: true, new: true }
//     );
//     return done(null, user);
//   } catch (e) {
//     return done(e);
//   }
// }));

// // 🔹 Discord OAuth
// passport.use(new DiscordStrategy({
//   clientID: data.discord_client_id,
//   clientSecret: data.discord_client_secret,
//   callbackURL: "/api/v1/oauth/discord/callback",
//   scope: ["identify", "email"],
// }, async (_accessToken, _refreshToken, profile, done) => {
//   try {
//     const email = profile.email || `${profile.username}@discord.com`;
//     const user = await User.findOneAndUpdate(
//       { username: email },
//       { $set: { username: email } },
//       { upsert: true, new: true }
//     );
//     return done(null, user);
//   } catch (e) {
//     return done(e);
//   }
// }));

// // 🔹 GitHub + Discord Routes
// app.get("/api/v1/oauth/github", passport.authenticate("github"));
// app.get("/api/v1/oauth/github/callback", passport.authenticate("github", { session: false }), (req, res) => {
//   const user = req.user as { _id: string };
//   const token = generateToken(user);
//   res.redirect(`${data.frontend_url}?token=${token}`);
// });

// app.get("/api/v1/oauth/discord", passport.authenticate("discord"));
// app.get("/api/v1/oauth/discord/callback", passport.authenticate("discord", { session: false }), (req, res) => {
//   const user = req.user as { _id: string };
//   const token = generateToken(user);
//   res.redirect(`${data.frontend_url}?token=${token}`);
// });

interface AuthRequest extends Request{
    userId?:string | JwtPayload
}
app.post("/api/v1/content",userMiddleware, async (req:AuthRequest,res:Response):Promise<any>=>{
    const {link , type , title}=req.body;
    console.log("hi");
    try{
        //create and store the link
        const textForEmbedding = `${title} ${link} ${type}`;
        // const response = await hf.featureExtraction({
        //     model: embeddingModel,
        //     inputs: textForEmbedding,
        //   });
        const user= await Content.create({
            link:link,
            type:type,
            title:title,
            tags:[],
            // embedding: response,
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
  console.log("Entered Content API");
    const userId=req.userId;
    const content=await Content.find({
        userId:userId
    });
    console.log(content);

    if(!content){
      console.log("No Content Found");
        res.status(411).json({
            message:"No Content Found"
        })
    }

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
      // const response = await hf.featureExtraction({
      //   model: embeddingModel,
      //   inputs: textForEmbedding,
      // });
      const newUpload = new Upload({ title, description, file: fileUrl, fileType, userId,
        // embedding: response 
      });
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
        console.log("Uploads found:", uploads);

        if (!uploads || uploads.length === 0) {
          console.log("No uploads found");
            return res.status(404).json({ message: "No uploads found" });
        }

        res.json({ uploads });
    } catch (e) {
        console.error("Error fetching uploads:", e);
        res.status(500).json({ message: "Server error", error: e });
    }
});
app.get("/api/v1/profile",userMiddleware,async (req:AuthRequest,res:Response):Promise<any>=>{
    console.log("Profile API called");
    const userId=req.userId;
    const user=await User.findOne({ _id:userId});
    if(!user){
        res.status(411).json({
            message:"User not found"
        })
    }

    const content=await Content.find({
        userId:userId});
    const uploads = await Upload.find({ userId:userId
    }); 
    const countContent=content.length;
    const countUploads=uploads.length;
    console.log(countUploads);
    
    res.json({
        username:user?.username as string   ,
        contentCount:countContent,
        uploadsCount:countUploads
    });


})  
// app.post("/search", async (req: Request, res: Response):Promise<any> => {
//     const { query } = req.body;
//     if (!query) return res.status(400).json({ error: "Query is required" });
  
//     console.log(`Received search request: "${query}"`);
//     // const searchResults = await searchDatabase(query);
//     // let Response = "No relevant answer found.";
//     // if(searchResults){
//     //           Response = await generateAIResponse(searchResults, query);
//     // }
  
//     res.json({ results: searchResults, Response });
//   });
     
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
app.delete("/api/social-media/:id", userMiddleware, async (req: AuthRequest, res: Response): Promise<any> => {
  console.log("Entered Delete API");
  console.log("User ID:", req.userId);
  console.log(req.params);
  const id = req.params.id;
  console.log("ID to delete:", id);

  try {
    // Validate ID format (assuming MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Attempt to delete the document
    console.log("Deleting content with ID:", id);
    const result = await Content.deleteOne({
      _id: id,
      userId: req.userId,
    });
   console.log(result);
    // Check if a document was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Content not found or not authorized" });
    }

    // Success response
    console.log("Deleted successfully");
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error in delete API:", error);
    res.status(500).json({ message: "Server error" });
  }
});

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
    const uploads = await Upload.find({ userId:link.userId
    });
    const TotalContent=content.length;
    const TotalUploads=uploads.length;

    console.log(uploads);
    console.log(TotalUploads);  
    if(!user){
        res.status(411).json({
            message:"user not found , error should ideally not happen"
        })
    }
    
    res.json({
        username:user?.username,
        TotalContent:TotalContent,
        TotalUploads:TotalUploads,
        content:content,
        uploads:uploads,
    })
})






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




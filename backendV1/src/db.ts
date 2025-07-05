import mongoose, {Schema} from "mongoose"
import { Types} from "mongoose"


const userSchemas=new Schema({
    username:{type:String ,unique:true},
    password:{type:String , unique:true},
})
const tagSchemas=new Schema({
    title:{type:String, required:true , unique:true}
});

export const User=mongoose.model("User",userSchemas);
export const Tag=mongoose.model("Tag", tagSchemas);

const contentTypes=["youtube","twitter","instagram","linkedin"];

const contentSchemas= new Schema({
    link:{type:String , required:true},
    type:{type:String , enum:contentTypes, required:true},
    title:{type:String , required:true},
    tags:[{type:Types.ObjectId , ref:'Tag'}],
    userId:{type:Types.ObjectId,ref:'User',required:true},
    // embedding: { type: [Number], default: [] }, 

});
export const Content=mongoose.model("Content",contentSchemas);

const linkSchemas=new Schema({
    hash:{type:String , reqired:true },
    userId:{type:Types.ObjectId, ref:"User", required:true}
});

export const Link=mongoose.model("Link",linkSchemas);

const UploadSchema = new mongoose.Schema({
  title: String,
  description: String,
  file: String,
  fileType: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   embedding: { type: [Number], default: [] }, 
});

  export const Upload = mongoose.model("Upload", UploadSchema);


  
import { mongo } from "mongoose";

//using dotenv file
import * as dotenv from "dotenv";
dotenv.config();
export const data={
    MongoURL:process.env.mongo_url
}
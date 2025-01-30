
require("dotenv").config();

if (!process.env.MONGO_URL || !process.env.JWT_PASSWORD) {
    throw new Error("Missing required environment variables: MONGO_URL or JWT_PASSWORD");
}
console.log(process.env.MONGO_URL);

export const data = {
    MongoURL: process.env.MONGO_URL,  // No need for `as string` due to the check above
    JwtPassword: process.env.JWT_PASSWORD,
};

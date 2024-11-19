// require("dotenv").config({ path: "./.env" });

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";


connectDB();











/*
import express from "express";
const app = express();
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (err) => {
            console.error("ERROR: ", err);
            throw err;
        });

        app.listen(process.env.PORT, () => console.log(`App is running on port ${process.env.PORT}`));
    } catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
})()

*/


// My Approach
/*
    await mongoose.connect(process.env.MONGODB_URI, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    console.log("Connected to DB");
*/
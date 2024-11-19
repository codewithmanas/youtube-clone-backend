// require("dotenv").config({ path: "./.env" });

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;


connectDB()
.then(() => { 
    // console.log("Connected to DB");
    app.on("error", (err) => {
        console.error("ERROR on app: ", err);
         throw err;
    })

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); 
})
.catch((error) => { 
    console.log("MONGODB connection failed!!!", error);
});











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
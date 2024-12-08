import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;


connectDB()
.then(() => { 

    app.on("error", (err) => {
        console.error("ERROR on app: ", err);
         throw err;
    })

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); 
})
.catch((error) => { 
    console.log("MONGODB connection failed!!!", error);
});

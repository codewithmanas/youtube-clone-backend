import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import fs from "fs";

const registerUser = asyncHandler(async (req, res) => {

    // get user details from frontend (through req.body)
    const { username, email, fullName, password } = req.body;

    if(!username || !email || !fullName || !password){
        throw new ApiError(400, "All fields are required");
    }

    if([username, email, fullName, password].some((field) => (
            field.trim() === ""
    ))){
        throw new ApiError(400, "Fields cannot be empty");
    }


    // check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        if(req.files?.avatar){
            fs.unlinkSync(req.files?.avatar[0]?.path);
        }

        if(req.files?.coverImage) {
            fs.unlinkSync(req.files?.coverImage[0]?.path);
        }

        throw new ApiError(409, "User already exists");
    }


    if(!(req.files?.avatar)){
        throw new ApiError(400, "Avatar image is required");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    let coverImageLocalPath = null;

    if(!(req.files?.coverImage)){
        // throw new ApiError(400, "coverImage is required");
        console.log("coverImage is required")
    } else {
        coverImageLocalPath = req.files?.coverImage[0]?.path;
    }    

    console.log("avatarLocalPath, coverImageLocalPath", avatarLocalPath, coverImageLocalPath);


    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    console.log("avatar: ", avatar);
    console.log("coverImage: ", coverImage);

    if(!avatar){ // if upload fails
        throw new ApiError(500, "Failed to upload avatar image");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", // coverImage is optional
    }); // create user object - create entry in db


    const responseUser = await User.findById(user._id) // remove password and refresh token from response
    .select("-password -refreshToken")

    if(!responseUser){ // if user creation fails
        throw new ApiError(500, "Failed to create user"); // check for user creation
    } // return response


    return res.status(201).json(new ApiResponse(200, "User created successfully", responseUser));


    res.status(200).json({ success: true, message: "done"});

    console.log("before return statement");
    return;
    console.log("after return statement");

    

    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

})


const loginUser = asyncHandler(async (req, res) => {
    // get user details from frontend or req.body
     const { username, password } = req.body;
     console.log("username, password", username, password); // debug

     res.status(200).json(new ApiResponse(200, "User logged in"));
})


export { loginUser, registerUser }
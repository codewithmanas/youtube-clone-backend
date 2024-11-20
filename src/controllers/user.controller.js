import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend or req.body

    const { username, email, fullName, password } = req.body;
    console.log("username, email, fullName, password", username, email, fullName, password); // debug


    if([username, email, fullName, password].some((field) => (
        field?.trim() === ""
    ))){
        throw new ApiError(400, "All fields are required");
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    console.log("avatarLocalPath, coverImageLocalPath", avatarLocalPath, coverImageLocalPath);

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    console.log("avatar, coverImage", avatar, coverImage);

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

    return res.status(201).json(new ApiResponse(200, responseUser, "User created"));
    

    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

})


export { registerUser }
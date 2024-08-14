import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

function IsStringInvalid(str) {
  if (str == undefined || str.length === 0) {
    return true;
  } else {
    return false;
  }
}

const generateTokenAccess = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    // console.log("userId", user);
    // console.log("accesToken", accessToken);
    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Somthing went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, profession, password } = req.body;
  // console.log("email", email);

  if (
    IsStringInvalid(name) ||
    IsStringInvalid(email) ||
    IsStringInvalid(phone) ||
    IsStringInvalid(profession) ||
    IsStringInvalid(password)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const user = await User.create({
    email,
    password,
    name: name.toLowerCase(),
    phone,
    profession,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Somthing went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registerd Successfully"));
});

/*
Login function
*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (IsStringInvalid(email) || IsStringInvalid(password)) {
    throw new ApiError(400, "username or email is required");
  }
  const user = await User.findOne({
    $or: [{ email }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const { accessToken } = await generateTokenAccess(user._id);
  // console.log("tokenGenerate>>>", accessToken);
  const loggedInUser = await User.findById(user._id).select("-password");
  // console.log("loggedInUser>>>>>>", loggedInUser);
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
      },
      "User logged In successfully"
    )
  );
});

/*
get all user
*/

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -email");

  return res
    .status(201)
    .json(new ApiResponse(200, users, "All Users are here"));
});

export { registerUser, loginUser, allUsers };

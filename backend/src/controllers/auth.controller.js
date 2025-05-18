
import UserRole  from "../generated/prisma/client.js";
import { asyncHandlers } from "../utills/asyncHandler.js";
import { apiResponseHandler } from "../utills/apiresponseHandler.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { db } from "../libs/db.js";
import jwt from "jsonwebtoken"
import {
  hashPassword,
  generateAccessToken,
  isPasswordCorrect,
  generateRefreshToken
} from "../utills/authUtills.js";


// Register User
const registerUser = asyncHandlers(async (req, res) => {
  const { name, email, password,role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(new apiError(400, "All fields are required"));
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return res.status(400).json(new apiError(400, "Email is already in use"));
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || UserRole.USER     }
  });

  console.log("data kyu nahi aa rha hai",user);
  

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return res.status(200).json(
    new apiResponseHandler(200, "User registered successfully", {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role:  user.role
      },
      accessToken,
      refreshToken
    })
  );
});

// Login User
const loginUser = asyncHandlers(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(new apiError(400, "Email and password are required"));
  }

  // Find user
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json(new apiError(400, "Invalid email or password"));
  }

  // Validate password
  const isValid = await isPasswordCorrect(password, user.password);
  if (!isValid) {
    return res.status(400).json(new apiError(400, "Invalid email or password"));
  }

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return res.status(200).json(
    new apiResponseHandler(200, "Login successful", {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      accessToken,
      refreshToken
    })
  );
});

//logoutUser
 const logoutUser = asyncHandlers(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  // If no refresh token is found, clear existing cookie 
  if (!refreshToken) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res
      .status(200)
      .json(new apiResponseHandler(200, "Logged out successfully", null));
  }

  // If refresh token is found, proceed to invalidate it from the user document
  const user = await db.user.findUnique({ where: {refreshToken} });

  if (user) {
    // Nullify the refresh token for the user
    user.refreshToken = null;
    await user.save();  // Make sure to save changes in the database

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", { httpOnly: true });

    return res.status(200).json(new apiResponseHandler(200, "Logged out successfully", null));
  }

  // If no user is found with the refresh token, just clear the cookie
  res.clearCookie("refreshToken", { httpOnly: true });
  return res
    .status(400)
    .json(new apiError(400, "Invalid refresh token"));
});

// middlewares/authenticateUser
const verifyUser = asyncHandlers(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received Token:", token);
console.log("ACCESS_JWT_SECRET Used:", process.env.ACCESS_JWT_SECRET);


  if (!token) {
    return res.status(400).json(new apiError(400, "Invalid-token"));
}

  try {
    const decoded = jwt.verify(token,process.env.ACCESS_JWT_SECRET);
    console.log("Access JWT Secret:", process.env.ACCESS_JWT_SECRET);

    console.log("Decoded Token:", decoded);
    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select:{
        id:true,
        image:true,
        name:true,
        email:true,
        role:true
      }
    });

    if (!user) {
      return res.status(404).json(new apiError(404, "user not found!"));
    }


    req.user = user; // Attach user to request
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json(new apiError(401, "please login or register yourself"));
  }
});





export { registerUser, loginUser,logoutUser,verifyUser };

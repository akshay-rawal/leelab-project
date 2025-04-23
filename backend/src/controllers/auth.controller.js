import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient,UserRole  } from "../generated/prisma/client.js"
import { asyncHandlers } from "../libs/asyncHandler.js";
import { apiResponseHandler } from "../libs/apiresponseHandler.js";
import { apiError } from "../libs/apiErrorHandler.js";

const prisma = new PrismaClient();

const registerUser = asyncHandlers(async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json(new apiError(400, "All fields are required"));
  }

  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res
        .status(400)
        .json(new apiError(400, "Email is already in use"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role:UserRole.USER
      }
    });
    
    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role }, 
        JWT_SECRET_KEY, 
        { expiresIn: "1h" } 
      );

    return res.status(200).json(new apiResponseHandler(200, "User registered successfully", {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token
    }));

  } catch (error) {
    console.error(error);
    return res
    .status(500)
    .json(new apiError(500, "sorry! server error"));  }
})

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json(new apiError(400, "Email and password are required"));
    }
  
    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user) {
        return res.status(400).json(new apiError(400, "Invalid email or password"));
      }
  
      // Compare hashed passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json(new apiError(400, "Invalid email or password"));
      }
  
      // Generate JWT Token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET, // Use your secret from the .env file
        { expiresIn: '1h' } // Token expires in 1 hour
      );
  
      return res.status(200).json(new apiResponseHandler(200, "Login successful", { token }));
  
    } catch (error) {
      console.error(error);
      return res.status(500).json(new apiError(500, "Server error"));
    }
  };
  

export { registerUser,loginUser};

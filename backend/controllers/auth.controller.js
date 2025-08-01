import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { ENV_VARS } from "../config/envVars.js";

export async function signup(req,res)
{
    try {
         const {email,username,password}=req.body;
         if (!email || !password || !username) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}
        const emailRegex = /^[a-zA-Z0-9._%+-]+@rmd\.ac\.in$/;
        if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: "Invalid email" });
		}

		if (password.length < 6) {
			return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
		}

		const existingUserByEmail = await User.findOne({ email: email });

		if (existingUserByEmail) {
			return res.status(400).json({ success: false, message: "Email already exists" });
		}

		const existingUserByUsername = await User.findOne({ username: username });

		if (existingUserByUsername) {
			return res.status(400).json({ success: false, message: "Username already exists" });
		}

        const salt = await bcryptjs.genSalt(10);                             //bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
			email,
			password: hashedPassword,
			username,
		});
        await newUser.save();
		generateTokenAndSetCookie(newUser,res);
		
        res.status(201).json({
			success: true,
			user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
		});
    } catch (error) {
        console.log("Error in signup controller", error);
		res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}

export async function login(req,res)
{
    try {
        const {email,password}=req.body;
        if (!email || !password) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ success: false, message: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
        generateTokenAndSetCookie(user,res);

		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
    } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}

export async function logout(req,res)
{
    try {
		res.clearCookie("jwt-portal",{
			httpOnly:true,
			sameSite:"strict",
			secure:ENV_VARS.NODE_ENV !== 'development',
		});
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}


export async function authCheck(req, res) {
	try {
		//console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

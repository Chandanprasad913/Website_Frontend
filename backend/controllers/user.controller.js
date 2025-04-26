import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}
// route for userLogin
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            const token = createToken(user._id)

            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }
        else {
            const token = createToken(user._id)

            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// route for userRegister

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //* checking if user already exists

        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //* validating email format and password 

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            })
        }

        //* hashing password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        })

    } catch (error) {
        console.error("Error in registerUser: ", error)
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again"
        })
    }
}


// route for adminLogin
export const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)

            return res.status(200).json({
                success: true,
                message: "Admin logged in successfully",
                token
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//  Controller for fetching User Info
export const getUserInfo = async (req, res) => {
    try {
        // 1. Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or malformed",
            });
        }

        const token = authHeader.split(" ")[1];

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Fetch user by ID
        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 4. Send user data
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user,
        });

    } catch (error) {
        console.error("Error in getUserInfo: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

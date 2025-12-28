import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';

// User registration
export const register = async (req, res) => {
    const { username, email, password, role, city, businessCategory } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user', // default user, can be 'vendor'
            city: city || 'Jabalpur',
            businessCategory: businessCategory || 'Clothing'
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // 2. Find User
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        // 3. Check Password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 4. Check JWT Secret (Very Important! 500 error yahi se aata hai)
        const secret = process.env.JWT_SECRET || 'fallback_secret_key_123';
        
        // 5. Generate Token
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id, role: existingUser.role },
            secret,
            { expiresIn: "24h" }
        );

        // 6. Success Response
        res.status(200).json({ 
            result: {
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role, // Dashboard redirect ke liye zaroori hai
                city: existingUser.city
            }, 
            token 
        });

    } catch (error) {
        // 🔥 Yeh line aapko terminal mein batayegi ki problem kya hai
        console.error("DETAILED LOGIN ERROR:", error); 
        res.status(500).json({ message: "Something went wrong on the server", error: error.message });
    }
};
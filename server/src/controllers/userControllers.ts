import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Controller to handle user registration
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists.' });

    // Create a new user
    user = new User({ username, email, password });

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to handle user login
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
  
      // Generate a JWT token
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
      // Set cookie with JWT token
      res.cookie('jwt', token, {
        httpOnly: true, // Cookie only accessible via HTTP(S)
        // other options like secure, sameSite, etc. based on your security requirements
      }).json({ message: 'Login successful.' });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

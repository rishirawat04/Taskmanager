import express, { Request, Response, NextFunction } from 'express';
import connectDB from './utils/db';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import bodyParser from 'body-parser';
import cors from 'cors'; 
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://taskmanager-frontend-rwcj.onrender.com', // Specify the origin you want to allow
  credentials: true, // Enable sending cookies
};

app.use(cors(corsOptions)); // Use cors middleware with the specified options

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use('/api', userRoutes);
app.use('/api', taskRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error:any) {
    console.error('Error starting server:', error.message);
  }
};

startServer();

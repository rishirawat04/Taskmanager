import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!).then(() => {
        console.log('MongoDB connected successfully');
    })
    
  } catch (error:any) {
    console.error('MongoDB connection error:', error.message);
    
  }
};

export default connectDB;

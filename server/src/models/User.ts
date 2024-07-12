import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the User document structure
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// User schema definition
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;

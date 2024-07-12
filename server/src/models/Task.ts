import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  user: string; // This should match the user ID from UserPayload
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;

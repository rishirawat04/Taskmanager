import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

// Controller to handle task creation
export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate } = req.body;
  const userId = req.user?.userId; // Assuming user ID is available in req.user

  try {
    // Create a new task
    const task = new Task({ title, description, dueDate, user: userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all tasks for a user
export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user?.userId; // Assuming user ID is available in req.user

  try {
    // Find all tasks for the authenticated user, sorted by due date
    const tasks = await Task.find({ user: userId }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a task
export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;
    const userId = req.user?.userId; // Assuming user ID is available in req.user
  
    try {
      // Validate if the ID is a valid ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid task ID' });
      }
  
      // Find the task by ID
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      // Check if the authenticated user is the owner of the task
      if (task.user.toString() !== userId) return res.status(401).json({ message: 'Not authorized' });
  
      // Update task fields
      task.title = title || task.title;
      task.description = description || task.description;
      task.dueDate = dueDate || task.dueDate;
      task.completed = completed !== undefined ? completed : task.completed;
  
      // Save the updated task to the database
      await task.save();
      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Controller to delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId; // Assuming user ID is available in req.user

  try {
    // Find the task by ID
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Check if the authenticated user is the owner of the task
    if (task.user.toString() !== userId) return res.status(401).json({ message: 'Not authorized' });

    // Delete the task
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

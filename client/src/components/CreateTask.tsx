import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { createTask } from '../redux/slices/taskSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../styling/Loader';

const CreateTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error('Title is required');
      return;
    }

    const taskData = {
      title,
      description,
      dueDate,
      completed: false,
    };

    try {
      setIsLoading(true);
      await dispatch(createTask(taskData)).unwrap();
      toast.success('Task created successfully!');
      navigate('/dashboard');
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      {isLoading && <Loader />}
      <form onSubmit={handleCreateTask} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Task
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;

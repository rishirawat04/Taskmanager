import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTasks, updateTask } from '../redux/slices/taskSlice';
import { toast } from 'react-toastify';
import Loader from '../styling/Loader';

const EditTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => task._id === id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description || '');
        setDueDate(task.dueDate || '');
        setCompleted(task.completed);
      }
    }
  }, [tasks, id]);

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error('Title is required');
      return;
    }

    const taskData = {
      title,
      description,
      dueDate,
      completed,
    };

    if (id) {
      try {
        await dispatch(updateTask({ id, taskData })).unwrap();
        toast.success('Task updated successfully!');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to update task');
      }
    } else {
      toast.error('Invalid task ID');
    }
  };

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      {loading && <Loader />}
      <form onSubmit={handleUpdateTask} className="bg-white p-6 rounded-lg shadow-md">
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="completed">
            Completed
          </label>
          <input
            id="completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2 leading-tight"
          />
          <span className="text-sm">{completed ? 'Completed' : 'Incomplete'}</span>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Task
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;

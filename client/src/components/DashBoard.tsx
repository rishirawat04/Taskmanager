import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTasks, deleteTask, updateTask } from '../redux/slices/taskSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../styling/Loader';
import LogoutButton from './LogoutButton';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await dispatch(updateTask({ id, taskData: { completed: !completed } })).unwrap();
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold hover:underline">
            Task Management
          </Link>
          <div className="space-x-4">
            <LogoutButton />
            <button
              onClick={() => navigate('/create-task')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create New Task
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <Loader />}
          {tasks?.map((task) => (
            <div key={task._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105">
              <div>
                <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <p className="text-gray-500 mb-2">Due Date: {task.dueDate}</p>
                {task.dueDate === todayString && (
                  <p className="text-red-500 font-bold">Due today!</p>
                )}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => navigate(`/edit-task/${task._id}`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                  className={`${
                    task.completed ? 'bg-green-500' : 'bg-red-500'
                  } text-white px-4 py-2 rounded-lg hover:bg-green-700 ml-2 transition-all duration-300`}
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 ml-2 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

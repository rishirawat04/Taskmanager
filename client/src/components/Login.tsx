import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../styling/Loader'; 

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: 'gojo04@gmail.com', // Initial test email
    password: '12345', // Initial test password
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success('Login successful!',{
        autoClose: 100,
      });
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed',{
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading && <Loader />} {/* Render Loader component if loading is true */}
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:underline"
            >
              Create an account
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          For testing, you can use the following credentials:<br />
          <strong>Email:</strong> gojo04@gmail.com<br />
          <strong>Password:</strong> 12345
        </p>
      </div>
    </div>
  );
};

export default Login;

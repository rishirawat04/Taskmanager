import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateTaskPage from './pages/CreateTaskPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditTask from './components/EditTask';
import AuthRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
   // console.log(user);
  

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        
        {/* Protected Routes */}
        <Route element={<AuthRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

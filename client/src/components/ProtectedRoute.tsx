import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const AuthRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  //console.log("protected route",user);
  

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;

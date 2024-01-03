import { useAppContext } from 'AppContextProvider';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoutes({ children }) {
  const { user } = useAppContext();

  if (user) {
    return children;
  }
  return <Navigate to="/login" replace={true}></Navigate>;
}

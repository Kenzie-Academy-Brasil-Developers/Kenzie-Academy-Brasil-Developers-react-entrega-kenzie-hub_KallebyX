import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import RegisterPage from '../../components/RegisterPage';
import LoginPage from '../../components/LoginPage';


function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default PublicRoutes;

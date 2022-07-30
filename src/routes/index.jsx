import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import Login from '../pages/Login';
import Photo from '../pages/Photo';
import Register from '../pages/Register';
import Student from '../pages/Student';
import Students from '../pages/Students';
import Page404 from '../pages/Page404';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Students />} />
      <Route path="/student/:id/edit" element={<PrivateRoute />}>
        <Route path="/student/:id/edit" element={<Student />} />
      </Route>
      <Route path="/student" element={<PrivateRoute />}>
        <Route path="/student" element={<Student />} />
      </Route>
      <Route path="/photo/:id" element={<PrivateRoute />}>
        <Route path="/photo/:id" element={<Photo />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

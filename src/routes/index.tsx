// src/routes/index.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import pages, layouts, and route guards
import { LoginScreen, RegisterScreen } from '../screens/index';
// import NotFound from '../pages/NotFound'; //TODO
// import DashboardLayout from '../layouts/DashboardLayout'; //TODO
// import StudentDashboard from '../pages/Dashboard/StudentDashboard'; //TODO
// import TeacherDashboard from '../pages/Dashboard/TeacherDashboard'; //TODO
// import AdminDashboard from '../pages/Dashboard/AdminDashboard'; //TODO
// import TeacherAssignments from '../pages/Dashboard/TeacherAssignments'; //TODO
// import PrivateRoute from './PrivateRoute'; //TODO
// import RoleRoute from './RoleRoute'; //TODO

const AppRoutes: React.FC = () => {
  // For demonstration, a dummy user object is defined here.
  // Replace this with your actual authentication logic (e.g., from Context or Redux).
  const user = {
    // Change this value to 'student', 'teacher', or 'admin' for testing.
    role: 'teacher',
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        {/* Protected Routes */}
        {/* <Route element={<PrivateRoute user={user} />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Student Dashboard Routes */}
            {/* <Route element={<RoleRoute user={user} allowedRoles={['student']} />}>
              <Route path="student" element={<StudentDashboard />} />
            </Route> */}

            {/* Teacher Dashboard Routes */}
            {/* <Route element={<RoleRoute user={user} allowedRoles={['teacher']} />}>
              <Route path="teacher" element={<TeacherDashboard />} />
              <Route path="teacher/assignments" element={<TeacherAssignments />} />
            </Route> */}

            {/* Admin Dashboard Routes */}
            {/* <Route element={<RoleRoute user={user} allowedRoles={['admin']} />}>
              <Route path="admin" element={<AdminDashboard />} />
            </Route> */}

            {/* Default dashboard landing */}
            {/* <Route index element={<div>Welcome to your Dashboard</div>} />
          </Route>
        </Route> */}

        {/* Fallback Routes */}
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

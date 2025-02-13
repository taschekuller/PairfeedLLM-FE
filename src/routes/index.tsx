import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../state/userAtom';

// Import pages, layouts, and route guards
import { LoginScreen, RegisterScreen, StudentDashboardScreen, TeacherDashboardScreen } from '../screens/index';
import RoleRoute from './RoleRoute';

const AppRoutes: React.FC = () => {
  // get user from jotai
  const [user] = useAtom(userAtom)

  // const user = {
  //   id: "1",
  //   email: "user@example.com",
  //   fullName: "John Doe",
  //   role: "teacher",
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        {/* Protected Routes */}
        {/* <Route path="/dashboard" element={
          user.role === 'student' ? <Navigate to="/student/dashboard" replace /> :
            user.role === 'teacher' ? <Navigate to="/teacher/dashboard" replace /> :
              <Navigate to="/login" replace />
        } /> */}

        <Route path="/studentDashboard" element={<StudentDashboardScreen />} />
        <Route path="/teacherDashboard" element={<TeacherDashboardScreen />} />


        {/* Role-based Routes */}
        {/* Student Dashboard */}
        {/* <Route element={<RoleRoute user={user} allowedRoles={['student']} />}>
          <Route path="/student/dashboard" element={<StudentDashboardScreen />} />
        </Route> */}

        {/* Teacher Dashboard */}
        {/* <Route element={<RoleRoute user={user} allowedRoles={['teacher']} />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboardScreen />} />
        </Route> */}

        {/* Admin Dashboard (if applicable) */}
        {/* <Route element={<RoleRoute user={user} allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route> */}

        {/* Fallback Routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

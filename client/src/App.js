import * as React from 'react';
import { useContext } from 'react';
import './App.css';
import Navbar from "./components/Homepages/Navbar";
import Login from "./components/Homepages/Login";
import Main from "./components/Homepages/Main";
import Admin from "./components/adminComponents/Admin";
import EditAbout from "./components/editComponents/EditAbout";
import EditEducation from "./components/editComponents/EditEducation";
import EditProjects from "./components/editComponents/EditProjects";
import EditExperience from "./components/editComponents/EditExperience";
import { Route, Routes, Navigate } from "react-router-dom";
import { DataContext } from './components/context/GlobalContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const state = useContext(DataContext);
  const [isLogin] = state.isLogin;

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const state = useContext(DataContext);
  const [isLogin] = state.isLogin;

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Main />} />
        <Route 
          path="/login" 
          element={
            isLogin ? <Navigate to="/admin" replace /> : <Login />
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/edit/:id" 
          element={
            <ProtectedRoute>
              <EditAbout />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/editEducation/:id" 
          element={
            <ProtectedRoute>
              <EditEducation />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/editProject/:id" 
          element={
            <ProtectedRoute>
              <EditProjects />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/editExperience/:id" 
          element={
            <ProtectedRoute>
              <EditExperience />
            </ProtectedRoute>
          } 
        />


        {/* Catch all route - 404 */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </>
  );
};

export default App;
import axios from "axios";
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const DataContext = createContext();

const API_BASE_URL = 'http://localhost:2000'; // Move this to an environment variable in production

export const DataProvider = ({ children }) => {
  // State Management
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  // Axios instance with default config
  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // 5 seconds timeout
  });

  // Check login status
  const checkLogin = useCallback(async () => {
    const token = localStorage.getItem('tokenStore');
    if (!token) {
      setIsLogin(false);
      return;
    }

    try {
      const { data } = await axios.get(`/user/verify`, {
        headers: { Authorization: token }
      });
      setIsLogin(data);
      
      if (!data) {
        localStorage.clear();
      }
    } catch (err) {
      console.error('Auth verification failed:', err);
      localStorage.clear();
      setIsLogin(false);
    }
  }, []);

  // Fetch all data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [aboutRes, educationRes, projectRes, experienceRes] = await Promise.all([
        api.get('/about'),
        api.get('/education'),
        api.get('/project'),
        api.get('/experience'),
      ]);

      setAbout(aboutRes.data);
      setEducation(educationRes.data);
      setProjects(projectRes.data);
      setExperience(experienceRes.data);
    } catch (err) {
      console.error('Data fetching failed:', err);
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh specific data
  const refreshData = async (dataType) => {
    try {
      switch (dataType) {
        case 'about':
          const { data: aboutData } = await api.get('/about');
          setAbout(aboutData);
          break;
        case 'education':
          const { data: educationData } = await api.get('/education');
          setEducation(educationData);
          break;
        case 'projects':
          const { data: projectsData } = await api.get('/project');
          setProjects(projectsData);
          break;
        case 'experience':
          const { data: experienceData } = await api.get('/experience');
          setExperience(experienceData);
          break;
        default:
          await fetchData();
      }
    } catch (err) {
      console.error(`Failed to refresh ${dataType}:`, err);
      setError(err.response?.data?.message || `Failed to refresh ${dataType}`);
    }
  };

  // Initial data load
  useEffect(() => {
    const initializeApp = async () => {
      await checkLogin();
      await fetchData();
    };

    initializeApp();
  }, [checkLogin, fetchData]);

  // Logout function
  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  const state = {
    about: [about, setAbout],
    education: [education, setEducation],
    experience: [experience, setExperience],
    isLogin: [isLogin, setIsLogin],
    projects: [projects, setProjects],
    isLoading: [isLoading, setIsLoading],
    error: [error, setError],
    refreshData,
    logout,
  };

  if (isLoading) {
    return <div>Loading...</div>; // Consider using a proper loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Consider using a proper error component
  }

  return (
    <DataContext.Provider value={state}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for using the context
export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
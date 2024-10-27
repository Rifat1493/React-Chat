import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from './store/AuthSlice';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import Header from './components/Header';
import Signup from './components/Signup';

function App() {
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [username, setUsername] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    
    const savedUsername = localStorage.getItem('username');
    setUsername(savedUsername)
    dispatch(setLoading(false)); 
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Header username={username} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/logout" element={token ? <Logout /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import Header from './components/Header';
import Signup from './components/Signup';

function App() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve the token from localStorage if it exists
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false); 
    
  }, []); // Only runs once on component mount

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state until the token is checked
  }

  // useEffect(() => {
  //   console.log('Token is:', token);
  // }, [token]); // This will log the token whenever it changes

  // const flag = null;
  // if (token)
  // {
  // flag = true;}

  // else{
  //   flag = false;
  // }
  // console.log(flag)

  
  return (
    <Router>
      <Header />
      <Routes>
        {/* Route for the login page */}
        
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Route for the predict page, only accessible if a token is present */}
        <Route path="/home" element={token ? <Home token={token} /> : <Navigate to="/login" />} />
        
        {/* <Route path="/home" element={ <Home token={token}  />} /> */}
        {/* Route for the logout page, only accessible if a token is present */}
        <Route path="/logout" element={token ? <Logout setToken={setToken} /> : <Navigate to="/login" />} />

        <Route path="/signup" element={<Signup />} />

        {/* Redirect to login by default if no route is matched */}
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );

  // return (
  //   <div>
  //     {token ? <div>Welcome back!</div> : <div>Please log in.</div>}
  //   </div>
  // );

}

export default App;


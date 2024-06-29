import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; // Assuming this is correctly configured
import Login from './components/Login';
import TripDetail from './components/TripDetail';
import Trips from './components/Trips';
import Register from './components/Register';
import Footer from './components/Footer';
import Loader from './components/Loader';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Validate the token with your backend
          const response = await axiosInstance.post('/api/auth/checkToken');
          if (response.data.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Redirect to login page after logout
    window.location.href = '/login';
  };

  if (loading) {
    return <Loader />; // Consider using a loading spinner instead
  }

  return (
    <Router>
      <div className="App p-4" data-theme="winter">
        <div className="navbar bg-base-300 rounded-box mb-6">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl">Tripper</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><a href="/">My Trips</a></li>
              {!isAuthenticated ? (
                <>
                  <li><a href="/login">Login</a></li>
                </>
              ) : (
                <li>
                  <details>
                    <summary>Account</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </details>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <main>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/trips/:id" element={<TripDetail />} />
                <Route path="/" element={<Trips />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

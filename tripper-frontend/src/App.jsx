import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; // Assuming this is correctly configured
import Login from './components/Login';
import TripDetail from './components/TripDetail';
import Trips from './components/Trips';
import Register from './components/Register';
import Footer from './components/Footer';
import Loader from './components/Loader';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <div className="App" data-theme="winter">
        <div className="m-4">
          <div className="navbar bg-base-300 rounded-box">
            <div className="flex-1">
              <a href="/" className="btn btn-ghost text-xl">Tripper</a>
            </div>
            <div className="flex-0">
              <ul className="menu menu-horizontal px-1 items-center">
                {!isAuthenticated ? (
                  <>
                    <li><a href="/login">Login</a></li>
                  </>
                ) : (
                  <>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                          <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                      </ul>
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="pb-8 mb-8">
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
                <Route path="/trips" element={<Trips />} />
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

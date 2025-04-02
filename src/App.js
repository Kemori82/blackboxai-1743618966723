import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={
              isAuthenticated ? 
                <AdminDashboard /> : 
                <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
            } />
            <Route path="/login" element={
              <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

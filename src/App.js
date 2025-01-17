import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import SubmissionForm from './components/SubmissionForm';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />
          
          {/* Default route is /submit */}
          <Route path="/submit" element={<SubmissionForm />} />

          {/* Private route */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Redirect "/" to "/submit" */}
          <Route path="/" element={<Navigate to="/submit" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

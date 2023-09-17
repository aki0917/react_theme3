import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/ui/Auth';
import Index from './pages/Index';
import { Toaster } from 'sonner';
import { SocketProvider } from './context/SocketContext';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router
    future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <SocketProvider>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/meeting" /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/auth" 
            element={isAuthenticated ? <Navigate to="/meeting" /> : <Auth />} 
          />
          <Route 
            path="/meeting" 
            element={isAuthenticated ? <Index /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/room/:roomId" 
            element={isAuthenticated ? <Index /> : <Navigate to="/auth" />} 
          />
        </Routes>
        <Toaster position="top-right" />
      </SocketProvider>
    </Router>
  );
};

export default App;

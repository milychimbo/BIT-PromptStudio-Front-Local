import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PromptLibrary from './pages/PromptLibrary';
import PromptEditor from './pages/PromptEditor';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<PromptLibrary />} />
          <Route path="/editor" element={<PromptEditor />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

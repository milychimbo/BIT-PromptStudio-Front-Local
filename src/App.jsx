import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PromptLibrary from './pages/PromptLibrary';
import PromptEditor from './pages/PromptEditor';
import Hub from './pages/Hub';
import { MsalProvider, MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from './authConfig';

const ProtectedLayout = () => {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={loginRequest}
    >
      <Outlet />
    </MsalAuthenticationTemplate>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hub" element={<Hub />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/library" element={<PromptLibrary />} />
            <Route path="/editor" element={<PromptEditor />} />
          </Route>
        </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;

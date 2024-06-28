import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Chat from './pages/Chat';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Documentation from './pages/Documentation';

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <RedirectHandler/>
      <Container sx={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Documentation/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </Container>
    </Router>
  );
};

// Redirects the hash routes to the actual routes
const RedirectHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hashPath = window.location.hash.replace('#', '');
    if (hashPath) {
      navigate(hashPath, { replace: true });
    }
  }, [navigate]);

  return null;
};

export default App;
import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Chat from './pages/Chat';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Documentation from './pages/Documentation';

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
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

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Chats } from './pages/Chats';
import { Analytics } from './pages/Analytics';
import { Logs } from './pages/Logs';
import { Settings } from './pages/Settings';
import { Bot } from './pages/Bot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="chats" element={<Chats />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="logs" element={<Logs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="bot" element={<Bot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { AppShell, MantineProvider } from '@mantine/core';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { NavbarSimple } from './layouts/Navbar';
import { HelloGenerator } from './pages/Hello-Generator';

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppShell padding="md" navbar={<NavbarSimple />}>
        <Routes>
          <Route path="/" element={<HelloGenerator />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
